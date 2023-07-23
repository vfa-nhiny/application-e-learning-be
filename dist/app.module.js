"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./module/auth/auth.module");
const users_module_1 = require("./module/users/users.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const courses_module_1 = require("./module/courses/courses.module");
const sections_module_1 = require("./module/sections/sections.module");
const comments_module_1 = require("./module/comments/comments.module");
const payments_module_1 = require("./module/payment/payments.module");
const rates_module_1 = require("./module/rates/rates.module");
const livestreams_module_1 = require("./module/livestreams/livestreams.module");
const exams_module_1 = require("./module/exam/exams.module");
const scores_module_1 = require("./module/score/scores.module");
const categories_module_1 = require("./module/categories/categories.module");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(`${process.env.MONGO_CONNECTION}`),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            courses_module_1.CourseModule,
            sections_module_1.SectionModule,
            comments_module_1.CommentsModule,
            payments_module_1.PaymentsModule,
            rates_module_1.RatesModule,
            livestreams_module_1.LivestreamsModule,
            exams_module_1.ExamsModule,
            scores_module_1.ScoresModule,
            categories_module_1.CategoriesModule,
            nestjs_redis_1.RedisModule.forRoot({
                config: {
                    host: "localhost" || process.env.URL,
                    port: 6379,
                    password: "authpassword",
                },
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map