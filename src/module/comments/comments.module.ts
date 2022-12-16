import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { CommentSchema } from "./schemas/comment.schema";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { HistorySchema } from "src/module/histories/schemas/history.schema";
import { CommentGateway } from "src/gateway/comment.gateway";
import { UserSchema } from "../users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Comment", schema: CommentSchema },
      { name: "User", schema: UserSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentGateway],
})
export class CommentsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: "example", method: RequestMethod.GET },
      // )
      .forRoutes(CommentsController);
  }
}
