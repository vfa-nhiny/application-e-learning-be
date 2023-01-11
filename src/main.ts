import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
// import { join } from "path";
// import * as express from "express";
// import { AllExceptionsFilter } from "./common/filters/all-exception.filter";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: false });
  app.useGlobalPipes(new ValidationPipe());

  // app.use("/public", express.static(join(__dirname, "../../public")));
  // const bodyParser = require("body-parser");
  // app.use(bodyParser.json({ limit: "5mb" }));
  // app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
  // app.useGlobalFilters(new AllExceptionsFilter());

  /* SECURITY */
  app.enable("trust proxy");
  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    credentials: true,
  });
  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP, please try again later",
    }),
  );
  const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // start blocking after 3 requests
    message: "Too many accounts created from this IP, please try again after an hour",
  });
  app.use("/auth/email/register", createAccountLimiter);
  /******/

  await app.listen(process.env.PORT || 8080, "0.0.0.0");
}
bootstrap();
