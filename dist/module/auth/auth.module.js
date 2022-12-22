"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./passport/jwt.strategy");
const auth_controller_1 = require("./auth.controller");
const user_schema_1 = require("../users/schemas/user.schema");
const forgottenPassword_schema_1 = require("./schemas/forgottenPassword.schema");
const consentRegistry_schema_1 = require("./schemas/consentRegistry.schema");
const users_service_1 = require("../users/users.service");
const jwt_service_1 = require("./jwt.service");
const mongoose_1 = require("@nestjs/mongoose");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const axios_1 = require("@nestjs/axios");
const emailVerification_schema_1 = require("./schemas/emailVerification.schema");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(auth_controller_1.AuthController);
    }
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "User", schema: user_schema_1.UserSchema },
                { name: "EmailVerification", schema: emailVerification_schema_1.EmailVerificationSchema },
                { name: "ForgottenPassword", schema: forgottenPassword_schema_1.ForgottenPasswordSchema },
                { name: "ConsentRegistry", schema: consentRegistry_schema_1.ConsentRegistrySchema },
            ]),
            axios_1.HttpModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, users_service_1.UsersService, jwt_service_1.JWTService, jwt_strategy_1.JwtStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map