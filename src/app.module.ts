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
import { PaymentsModule } from "./module/payment/payments.module";
import { RatesModule } from "./module/rates/rates.module";
import { LivestreamsModule } from "./module/livestreams/livestreams.module";
import { ExamsModule } from "./module/exam/exams.module";
import { ScoresModule } from "./module/score/scores.module";
import { CategoriesModule } from "./module/categories/categories.module";
import { RedisModule } from "./module/redis/redis.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_CONNECTION}`),
    UsersModule,
    AuthModule,
    CourseModule,
    SectionModule,
    CommentsModule,
    PaymentsModule,
    RatesModule,
    LivestreamsModule,
    ExamsModule,
    ScoresModule,
    CategoriesModule,
    // CommentGateway,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
