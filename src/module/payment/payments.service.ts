import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { Payment } from "./interfaces/payment.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as fs from "fs";
import { CreatePaymentDto } from "./dto/create-payment.dto";

const saltRounds = 10;

@Injectable()
export class PaymentsService {
  // constructor(@InjectModel("Payment") private readonly paymentModel: Model<Payment>, @InjectModel("History") private readonly historyModel: Model<Payment>) {}
  // async createNewPayment(newPayment: CreatePaymentDto): Promise<Payment> {
  //   const paymentDto = new this.paymentModel({ paymentId: crypto.randomUUID(), ...newPayment });
  //   const historyDto =
  //   return await paymentDto.save();
  // }
}
