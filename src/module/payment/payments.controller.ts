import { Controller, Post, Body, UseGuards, UseInterceptors, Req, Res } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import * as crypto from "crypto";
import * as querystring from "qs";
import * as moment from "moment";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/module/auth/constants";
import { sortObject } from "src/utils";

@Controller("payments")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("/createPaymentUrl")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  findById(@Req() req, @Res() res): Promise<IResponse> {
    console.log(req);
    try {
      // const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
      const ipAddr = "13.160.92.202";
      console.log(ipAddr);
      const tmnCode = process.env.vnp_TmnCode;
      const secretKey = process.env.vnp_HashSecret;
      let vnpUrl = process.env.vnp_Url;
      const returnUrl = process.env.vnp_ReturnUrl;
      console.log(tmnCode, secretKey, vnpUrl, returnUrl);

      const date = new Date();

      const createDate = moment(date).format("YYYYMMDDHHmmss");
      const orderId = moment(date).format("HHmmss");

      console.log(createDate, orderId);
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
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      vnp_Params = sortObject(vnp_Params);

      const signData = querystring.stringify(vnp_Params, { encode: false });
      const hmac = crypto.createHmac("sha512", secretKey);
      const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
      console.log(vnpUrl);
      // res.redirect(vnpUrl);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
