"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const express_rate_limit_1 = require("express-rate-limit");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        allowedHeaders: "*",
        origin: "*",
        credentials: true,
    });
    app.use((0, helmet_1.default)());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests from this IP, please try again later",
    }));
    const createAccountLimiter = (0, express_rate_limit_1.default)({
        windowMs: 60 * 60 * 1000,
        max: 100,
        message: "Too many accounts created from this IP, please try again after an hour",
    });
    app.use("/auth/email/register", createAccountLimiter);
    await app.listen(process.env.PORT || 8080, "0.0.0.0");
}
bootstrap();
//# sourceMappingURL=main.js.map