import { Module } from "@nestjs/common";
import { AuthModule } from "./module/auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./module/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CourseModule } from "./module/courses/courses.module";
import { SectionModule } from "./module/sections/sections.module";
import { CommentGateway } from "./gateway/comment.gateway";
import { CommentsModule } from "./module/comments/comments.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_CONNECTION}`),
    UsersModule,
    AuthModule,
    CourseModule,
    SectionModule,
    CommentsModule,
    // CommentGateway,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
