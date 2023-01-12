import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ScoresController } from "./scores.controller";
import { ScoresService } from "./scores.service";
import { ScoreSchema } from "./schemas/score.schema";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { CourseSchema } from "../courses/schemas/course.schema";
import { UserSchema } from "../users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Score", schema: ScoreSchema },
      { name: "Course", schema: CourseSchema },
      { name: "User", schema: UserSchema },
    ]),
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: "example", method: RequestMethod.GET },
      // )
      .forRoutes(ScoresController);
  }
}
