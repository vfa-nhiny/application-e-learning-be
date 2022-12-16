import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RatesController } from "./rates.controller";
import { RatesService } from "./rates.service";
import { RateSchema } from "./schemas/rate.schema";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { CourseSchema } from "../courses/schemas/course.schema";
import { UserSchema } from "../users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Rate", schema: RateSchema },
      { name: "Course", schema: CourseSchema },
      { name: "User", schema: UserSchema },
    ]),
  ],
  controllers: [RatesController],
  providers: [RatesService],
})
export class RatesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: "example", method: RequestMethod.GET },
      // )
      .forRoutes(RatesController);
  }
}
