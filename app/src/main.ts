import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { NODE_ENV } from "./constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === NODE_ENV.PRODUCTION,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Add cookie parser
  app.use(cookieParser());

  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
}
bootstrap();
