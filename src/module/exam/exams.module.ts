import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ExamsController } from "./exams.controller";
import { ExamsService } from "./exams.service";
import { ExamSchema } from "./schemas/exam.schema";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { HistorySchema } from "src/module/histories/schemas/history.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Exam", schema: ExamSchema }])],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: "example", method: RequestMethod.GET },
      // )
      .forRoutes(ExamsController);
  }
}
