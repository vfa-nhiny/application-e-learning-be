import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { PaymentSchema } from "./schemas/payment.schema";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { HistorySchema } from "src/module/histories/schemas/history.schema";
import { UserSchema } from "../users/schemas/user.schema";
import { UsersService } from "../users/users.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [PaymentsController],
  providers: [PaymentsService, UsersService],
})
export class PaymentsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: "example", method: RequestMethod.GET },
      // )
      .forRoutes(PaymentsController);
  }
}
