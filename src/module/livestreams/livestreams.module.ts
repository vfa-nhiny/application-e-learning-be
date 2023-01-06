import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LivestreamsController } from "./livestreams.controller";
import { LivestreamsService } from "./livestreams.service";
import { LivestreamSchema } from "./schemas/livestream.schema";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Livestream", schema: LivestreamSchema }])],
  controllers: [LivestreamsController],
  providers: [LivestreamsService],
})
export class LivestreamsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: "example", method: RequestMethod.GET },
      // )
      .forRoutes(LivestreamsController);
  }
}
