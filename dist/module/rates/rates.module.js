"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const rates_controller_1 = require("./rates.controller");
const rates_service_1 = require("./rates.service");
const rate_schema_1 = require("./schemas/rate.schema");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const course_schema_1 = require("../courses/schemas/course.schema");
const user_schema_1 = require("../users/schemas/user.schema");
let RatesModule = class RatesModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(rates_controller_1.RatesController);
    }
};
RatesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "Rate", schema: rate_schema_1.RateSchema },
                { name: "Course", schema: course_schema_1.CourseSchema },
                { name: "User", schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [rates_controller_1.RatesController],
        providers: [rates_service_1.RatesService],
    })
], RatesModule);
exports.RatesModule = RatesModule;
//# sourceMappingURL=rates.module.js.map