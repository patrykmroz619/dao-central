import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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

  if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
    const config = new DocumentBuilder().setTitle("DAO Maker").build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("explorer", app, document);
  }

  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
}
bootstrap();
