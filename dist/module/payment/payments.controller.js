"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const crypto = require("crypto");
const querystring = require("qs");
const response_dto_1 = require("../../common/dto/response.dto");
const utils_1 = require("../../utils");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    createPaymentUrl(req, res) {
        const moment = require("moment");
        const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        const tmnCode = process.env.vnp_TmnCode;
        const secretKey = process.env.vnp_HashSecret;
        let vnpUrl = process.env.vnp_Url;
        const returnUrl = process.env.vnp_ReturnUrl;
        const date = new Date();
        console.log(date);
        const createDate = moment(date).format("YYYYMMDDHHmmss");
        console.log(createDate);
        const expiredDate = moment(date).add(1, "h").format("YYYYMMDDHHmmss");
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
        vnp_Params = (0, utils_1.sortObject)(vnp_Params);
        const signData = querystring.stringify(vnp_Params, { encode: true });
        console.log(signData);
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        console.log(signData);
        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });
        console.log(vnpUrl);
        return res.status(200).json({ code: "00", data: vnpUrl });
    }
    vnPayIPN(req, res) {
        console.log(req);
        let vnp_Params = req.query;
        const secureHash = vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];
        vnp_Params = (0, utils_1.sortObject)(vnp_Params);
        const secretKey = process.env.vnp_HashSecret;
        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        if (secureHash === signed) {
            const orderId = vnp_Params["vnp_TxnRef"];
            const rspCode = vnp_Params["vnp_ResponseCode"];
            new response_dto_1.ResponseSuccess("Success", { code: vnp_Params["vnp_ResponseCode"] });
            console.log("success ipn");
        }
        else {
            new response_dto_1.ResponseError("Success", { code: vnp_Params["vnp_ResponseCode"] });
            console.log("success ipn", { code: vnp_Params["vnp_ResponseCode"] });
        }
    }
    vnPayReturn(req, res) {
        console.log(req);
        let vnp_Params = req.query;
        const secureHash = vnp_Params["vnp_SecureHash"];
        const orderInfo = vnp_Params["vnp_OrderInfo"];
        const payDate = vnp_Params["vnp_PayDate"];
        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];
        vnp_Params = (0, utils_1.sortObject)(vnp_Params);
        const tmnCode = process.env.vnp_TmnCode;
        const secretKey = process.env.vnp_HashSecret;
        const signData = querystring.stringify(vnp_Params, { encode: true });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        if (secureHash === signed) {
            new response_dto_1.ResponseSuccess("Success", { code: vnp_Params["vnp_ResponseCode"] });
            this.paymentsService.updateUserPremium({ userId: orderInfo, isPremium: true, startUsingPremiumDate: payDate });
        }
        else {
            new response_dto_1.ResponseSuccess("Success", { code: "97" });
            return { url: "https://ehehe-webview.netlify.app/success-payment", statusCode: 301 };
        }
    }
};
__decorate([
    (0, common_1.Post)("/create_payment_url"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "createPaymentUrl", null);
__decorate([
    (0, common_1.Get)("/vnpay_ipn"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "vnPayIPN", null);
__decorate([
    (0, common_1.Get)("/vnpay_return"),
    (0, common_1.Redirect)("https://ehehe-webview.netlify.app/success-payment", 301),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "vnPayReturn", null);
PaymentsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map