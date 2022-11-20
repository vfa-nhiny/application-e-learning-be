import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { CourseSchema } from "./schemas/course.schema";
import { LoggerMiddleware } from "../common/middlewares/logger.middleware";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Course", schema: CourseSchema }])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CourseModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: "example", method: RequestMethod.GET },
      // )
      .forRoutes(CoursesController);
  }
}
