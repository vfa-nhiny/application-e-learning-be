"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCoreModule = exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const user_schema_1 = require("./schemas/user.schema");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const course_schema_1 = require("../courses/schemas/course.schema");
const recommendation_service_1 = require("./recommendation.service");
const rate_schema_1 = require("../rates/schemas/rate.schema");
const nestjs_redis_1 = require("nestjs-redis");
const core_1 = require("@nestjs/core");
let UsersModule = class UsersModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(users_controller_1.UsersController);
    }
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "User", schema: user_schema_1.UserSchema },
                { name: "Course", schema: course_schema_1.CourseSchema },
                { name: "Rate", schema: rate_schema_1.RateSchema },
            ]),
            nestjs_redis_1.RedisModule.forRootAsync({
                useFactory: (moduleRef) => ({}),
                inject: [core_1.ModuleRef],
            }),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, recommendation_service_1.RecommendationService, nestjs_redis_1.RedisService],
        exports: [nestjs_redis_1.RedisService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
class RedisCoreModule {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
    }
}
exports.RedisCoreModule = RedisCoreModule;
//# sourceMappingURL=users.module.js.map