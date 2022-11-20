import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CourseModule } from "./course/courses.module";

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(`${process.env.MONGO_CONNECTION}`), UsersModule, AuthModule, CourseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
