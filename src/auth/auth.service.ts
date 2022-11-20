import * as bcrypt from "bcryptjs";
import * as nodemailer from "nodemailer";
import { default as config } from "../config";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JWTService } from "./jwt.service";
import { Model } from "mongoose";
import { User } from "../users/interfaces/user.interface";
import { UserDto } from "../users/dto/user.dto";
import { EmailVerification } from "./interfaces/emailVerification.interface";
import { ForgottenPassword } from "./interfaces/forgottenPassword.interface";
import { ConsentRegistry } from "./interfaces/consentRegistry.interface";
import { InjectModel } from "@nestjs/mongoose";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>,
    @InjectModel("EmailVerification")
    private readonly emailVerificationModel: Model<EmailVerification>,
    @InjectModel("ForgottenPassword")
    private readonly forgottenPasswordModel: Model<ForgottenPassword>,
    @InjectModel("ConsentRegistry")
    private readonly consentRegistryModel: Model<ConsentRegistry>,
    private readonly jwtService: JWTService,
    private readonly httpService: HttpService,
  ) {}

  async validateLogin(email, password) {
    const userFromDb = await this.userModel.findOne({ email: email });
    if (!userFromDb) throw new HttpException("LOGIN.USER_NOT_FOUND", HttpStatus.NOT_FOUND);
    if (!userFromDb.auth.email.valid) throw new HttpException("LOGIN.EMAIL_NOT_VERIFIED", HttpStatus.FORBIDDEN);

    const isValidPass = await bcrypt.compare(password, userFromDb.password);

    if (isValidPass) {
      const accessToken = await this.jwtService.createToken(email, userFromDb.role);
      return { token: accessToken, user: new UserDto(userFromDb) };
    } else {
      throw new HttpException("LOGIN.ERROR", HttpStatus.UNAUTHORIZED);
    }
  }

  async createEmailToken(email: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationModel.findOne({
      email: email,
    });
    /* Checking if the email has been sent recently. If it has, it throws an error. If it hasn't, it
    creates a new email token and returns true. */
    if (emailVerification && (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 < 15) {
      throw new HttpException("LOGIN.EMAIL_SENT_RECENTLY", HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const emailVerificationModel = await this.emailVerificationModel.findOneAndUpdate(
        { email: email },
        {
          email: email,
          emailToken: (Math.floor(Math.random() * 9000000) + 1000000).toString(), //Generate 7 digits number
          timestamp: new Date(),
        },
        { upsert: true },
      );
      return true;
    }
  }

  async saveUserConsent(email: string): Promise<ConsentRegistry> {
    //TODO: replace with your site url containing the updated version of the consent form
    const privacyPolicyURL = "https://www.[yoursite].com/api/privacy-policy";
    const cookiePolicyURL = "https://www.[yoursite].com/api/cookie-policy";
    try {
      const newConsent = new this.consentRegistryModel();
      newConsent.email = email;
      newConsent.date = new Date();
      newConsent.registrationForm = ["name", "email", "birthday date", "password"];
      newConsent.checkboxText = "I accept privacy policy";
      const privacyPolicyResponse: any = await lastValueFrom(this.httpService.get(privacyPolicyURL));
      newConsent.privacyPolicy = privacyPolicyResponse.data;
      const cookiePolicyResponse: any = await lastValueFrom(this.httpService.get(cookiePolicyURL));
      newConsent.cookiePolicy = cookiePolicyResponse.data;
      newConsent.acceptedPolicy = "Y";
      return await newConsent.save();
    } catch (error) {
      console.error(error);
    }
  }

  async createForgottenPasswordToken(email: string): Promise<ForgottenPassword> {
    const forgottenPassword = await this.forgottenPasswordModel.findOne({
      email: email,
    });
    if (forgottenPassword && (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15) {
      throw new HttpException("RESET_PASSWORD.EMAIL_SENT_RECENTLY", HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const forgottenPasswordModel = await this.forgottenPasswordModel.findOneAndUpdate(
        { email: email },
        {
          email: email,
          newPasswordToken: (Math.floor(Math.random() * 9000000) + 1000000).toString(), //Generate 7 digits number,
          timestamp: new Date(),
        },
        { upsert: true, new: true },
      );
      if (forgottenPasswordModel) {
        return forgottenPasswordModel;
      } else {
        throw new HttpException("LOGIN.ERROR.GENERIC_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    const emailVerif = await this.emailVerificationModel.findOne({
      emailToken: token,
    });
    if (emailVerif && emailVerif.email) {
      const userFromDb = await this.userModel.findOne({
        email: emailVerif.email,
      });
      if (userFromDb) {
        userFromDb.auth.email.valid = true;
        const savedUser = await userFromDb.save();
        await emailVerif.remove();
        return !!savedUser;
      }
    } else {
      throw new HttpException("LOGIN.EMAIL_CODE_NOT_VALID", HttpStatus.FORBIDDEN);
    }
  }

  async getForgottenPasswordModel(newPasswordToken: string): Promise<ForgottenPassword> {
    return await this.forgottenPasswordModel.findOne({
      newPasswordToken: newPasswordToken,
    });
  }

  async sendEmailVerification(email: string): Promise<boolean> {
    const model = await this.emailVerificationModel.findOne({ email: email });
    console.log(email, model);
    if (model && model.emailToken) {
      const transporter = nodemailer.createTransport({
        service: config.mail.host,
        auth: {
          user: config.mail.user,
          pass: config.mail.pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: "EHEHE LEARNING",
        to: email, // list of receivers (separated by ,)
        subject: "Verify Email",
        text: "Verify Email",
        html: "Hi! <br><br> Thanks for your registration<br><br>" + "<br><br>Your code is: <br><br>" + model.emailToken, // html body
      };

      const sent = await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log("Message sent: %s", error);
            return reject(false);
          }
          console.log("Message sent: %s", info.messageId);
          resolve(true);
        });
      });

      return sent;
    } else {
      throw new HttpException("REGISTER.USER_NOT_REGISTERED", HttpStatus.FORBIDDEN);
    }
  }

  async checkPassword(email: string, password: string) {
    const userFromDb = await this.userModel.findOne({ email: email });
    if (!userFromDb) throw new HttpException("LOGIN.USER_NOT_FOUND", HttpStatus.NOT_FOUND);

    return await bcrypt.compare(password, userFromDb.password);
  }

  async sendEmailForgotPassword(email: string, tokenModel: { newPasswordToken: string }): Promise<boolean> {
    const userFromDb = await this.userModel.findOne({ email: email });
    console.log(email);
    if (!userFromDb) throw new HttpException("LOGIN.USER_NOT_FOUND", HttpStatus.NOT_FOUND);

    if (tokenModel && tokenModel.newPasswordToken) {
      const transporter = nodemailer.createTransport({
        service: config.mail.host,
        auth: {
          user: config.mail.user,
          pass: config.mail.pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: "EHEHE LEARNING",
        to: email, // list of receivers (separated by ,)
        subject: "Forgotten Password",
        text: "Forgot Password",
        html: "Hi! <br><br> If you requested to reset your password<br><br>" + "<br><br>Your code is: <br><br>" + tokenModel.newPasswordToken, // html body
      };

      const sent = await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log("Message sent: %s", error);
            return reject(false);
          }
          console.log("Message sent: %s", info.messageId);
          resolve(true);
        });
      });

      return sent;
    } else {
      throw new HttpException("REGISTER.USER_NOT_REGISTERED", HttpStatus.FORBIDDEN);
    }
  }
}
