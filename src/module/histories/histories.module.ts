import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HistoriesController } from "./histories.controller";
import { HistoriesService } from "./histories.service";
import { HistorySchema } from "./schemas/history.schema";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";

@Module({
  imports: [MongooseModule.forFeature([{ name: "History", schema: HistorySchema }])],
  controllers: [HistoriesController],
  providers: [HistoriesService],
})
export class HistoriesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(HistoriesController);
  }
}
