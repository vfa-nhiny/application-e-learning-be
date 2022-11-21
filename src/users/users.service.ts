import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { ProfileDto } from "./dto/profile.dto";
import { SettingsDto } from "./dto/settings.dto";
import * as fs from "fs";
import { UpdateUserDto } from "./dto/update-user.dto";

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async createNewUser(newUser: CreateUserDto): Promise<User> {
    if (newUser.email && newUser.password) {
      const userRegistered = await this.findByEmail(newUser.email);
      if (!userRegistered) {
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);
        const createdUser = new this.userModel({ ...newUser });
        createdUser.userId = crypto.randomUUID();
        return await createdUser.save();
      } else if (!userRegistered.auth.email.valid) {
        return userRegistered;
      } else {
        throw new HttpException("REGISTRATION.USER_ALREADY_REGISTERED", HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException("REGISTRATION.MISSING_MANDATORY_PARAMETERS", HttpStatus.FORBIDDEN);
    }
  }

  async setPassword(email: string, newPassword: string): Promise<boolean> {
    const userFromDb = await this.userModel.findOne({ email: email });
    if (!userFromDb) throw new HttpException("LOGIN.USER_NOT_FOUND", HttpStatus.NOT_FOUND);

    userFromDb.password = await bcrypt.hash(newPassword, saltRounds);

    await userFromDb.save();
    return true;
  }

  async updateProfile(profileDto: UpdateUserDto): Promise<User> {
    console.log(profileDto);

    const userFromDb = await this.userModel.findOne({
      email: profileDto.email,
    });
    if (!userFromDb) throw new HttpException("COMMON.USER_NOT_FOUND", HttpStatus.NOT_FOUND);
    console.log(userFromDb);

    if (profileDto.name) userFromDb.name = profileDto.name;
    if (profileDto.phone) userFromDb.phone = profileDto.phone;
    if (profileDto.gender) userFromDb.gender = profileDto.gender;
    if (profileDto.birthday) userFromDb.birthday = profileDto.birthday;
    if (profileDto.avatar) userFromDb.avatar = profileDto.avatar;

    await userFromDb.save();
    return userFromDb;
  }

  async writeFile(dir: string, filename: string, base64Data: string): Promise<any> {
    return new Promise(function (resolve, reject) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFile(dir + "/" + filename, base64Data, "base64", function (err) {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  async removeFile(dir: string, filename: string): Promise<any> {
    return new Promise(function (resolve, reject) {
      if (fs.existsSync(dir)) {
        fs.stat(dir + "/" + filename, function (err, stat) {
          if (err == null) {
            //file exists
            fs.unlink(dir + "/" + filename, err => {
              if (err) reject(err);
              else resolve(true);
            });
          } else if (err.code == "ENOENT") {
            // file does not exist
            resolve(true);
          } else {
            reject(err);
          }
        });
      }
    });
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  }

  async updateSettings(settingsDto: SettingsDto): Promise<User> {
    const userFromDb = await this.userModel.findOne({
      email: settingsDto.email,
    });
    if (!userFromDb) throw new HttpException("COMMON.USER_NOT_FOUND", HttpStatus.NOT_FOUND);

    userFromDb.settings = userFromDb.settings || {};
    for (const key in settingsDto) {
      if (settingsDto.hasOwnProperty(key) && key != "email") {
        userFromDb.settings[key] = settingsDto[key];
      }
    }

    await userFromDb.save();
    return userFromDb;
  }
}
