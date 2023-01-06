import { Controller, Post, Body, UseGuards, UseInterceptors, Req, Res, Get, Redirect } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import * as crypto from "crypto";
import * as querystring from "qs";
import moment, * as moments from "moment";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/module/auth/constants";
import { sortObject } from "src/utils";

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("/create_payment_url")
  // @UseGuards(RolesGuard)
  // @Roles(role.student, role.teacher)
  createPaymentUrl(@Req() req, @Res() res) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const moment = require("moment");
    // console.log(req);
    const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    // const ipAddr = "13.160.92.202";
    const tmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;
    let vnpUrl = process.env.vnp_Url;
    const returnUrl = process.env.vnp_ReturnUrl;

    const date = new Date();

    console.log(date);

    const createDate = moment(date).format("YYYYMMDDHHmmss");
    console.log(createDate);

    const expiredDate = moment(date).add(24, "h").format("YYYYMMDDHHmmss");
    console.log(expiredDate);

    const orderId = moment(date).format("HHmmss");
    console.log(orderId);

    const amount = req.body.amount;
    const bankCode = req.body.bankCode;

    const orderInfo = req.body.orderDescription;
    const orderType = req.body.orderType;
    let locale = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }
    const currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_ExpireDate"] = expiredDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: true });
    console.log(signData);
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    console.log(signData);
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });
    console.log(vnpUrl);
    return res.status(200).json({ code: "00", data: vnpUrl });
    // return new ResponseSuccess("Create PaymentURL success", vnpUrl);
  }

  @Get("/vnpay_ipn")
  // @Redirect("https://docs.nestjs.com", 301)
  // @UseGuards(RolesGuard)
  // @Roles(role.student, role.teacher)
  vnPayIPN(@Req() req, @Res() res) {
    console.log(req);
    let vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    const secretKey = process.env.vnp_HashSecret;
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      const orderId = vnp_Params["vnp_TxnRef"];
      const rspCode = vnp_Params["vnp_ResponseCode"];
      //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      new ResponseSuccess("Success", { code: vnp_Params["vnp_ResponseCode"] });
      console.log("success ipn");
      // res.redirect();
    } else {
      new ResponseError("Success", { code: vnp_Params["vnp_ResponseCode"] });
      console.log("success ipn", { code: vnp_Params["vnp_ResponseCode"] });

      // return { url: "https://docs.nestjs.com/v5/", statusCode: 301 };
      // res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
    }
  }

  @Get("/vnpay_return")
  // @UseGuards(RolesGuard)
  @Redirect("https://ehehe-webview.netlify.app/success-payment", 301)
  // @Roles(role.student, role.teacher)
  vnPayReturn(@Req() req, @Res() res) {
    console.log(req);
    let vnp_Params = req.query;

    const secureHash = vnp_Params["vnp_SecureHash"];
    const orderInfo = vnp_Params["vnp_OrderInfo"];
    const payDate = vnp_Params["vnp_PayDate"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    const tmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;

    const signData = querystring.stringify(vnp_Params, { encode: true });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      new ResponseSuccess("Success", { code: vnp_Params["vnp_ResponseCode"] });
      this.paymentsService.updateUserPremium({ userId: orderInfo, isPremium: true, startUsingPremiumDate: payDate });
      //TODO: redirect ve man hinh payment successfully
    } else {
      //TODO: redirect ve man hinh payment unsuccessfully
      new ResponseSuccess("Success", { code: "97" });
      return { url: "https://ehehe-webview.netlify.app/success-payment", statusCode: 301 };
    }
  }
}
