import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SectionsController } from "./sections.controller";
import { SectionsService } from "./sections.service";
import { SectionSchema } from "./schemas/section.schema";
import { LoggerMiddleware } from "../common/middlewares/logger.middleware";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Section", schema: SectionSchema }])],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: "example", method: RequestMethod.GET },
      // )
      .forRoutes(SectionsController);
  }
}
