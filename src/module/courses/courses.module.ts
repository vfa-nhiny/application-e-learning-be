import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { CourseSchema } from "./schemas/course.schema";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { SectionsService } from "src/module/sections/sections.service";
import { SectionSchema } from "src/module/sections/schemas/section.schema";
import { UsersService } from "../users/users.service";
import { UserSchema } from "../users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Course", schema: CourseSchema },
      { name: "Section", schema: SectionSchema },
      { name: "User", schema: UserSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, SectionsService, UsersService],
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
