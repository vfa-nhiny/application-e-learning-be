import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserSchema } from "./schemas/user.schema";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { CourseSchema } from "../courses/schemas/course.schema";
import { RecommendationService } from "./recommendation.service";
import { RateSchema } from "../rates/schemas/rate.schema";
import { RedisModule, RedisService } from "nestjs-redis";
import { ModuleRef } from "@nestjs/core";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Course", schema: CourseSchema },
      { name: "Rate", schema: RateSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, RecommendationService, RedisService],
  exports: [RedisService],
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: "example", method: RequestMethod.GET },
      // )
      .forRoutes(UsersController);
  }
}
