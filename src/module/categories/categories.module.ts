import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerMiddleware } from "src/common/middlewares/logger.middleware";
import { CategoriesController } from "./categories.controller";
import { CategoryServices } from "./categories.services";
import { CategorySchema } from "./schemas/categories.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoryServices],
})
export class CategoriesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CategoriesController);
  }
}
