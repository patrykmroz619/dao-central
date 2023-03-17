import {
  INestApplication,
  LoggerService,
  ValidationPipe,
} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from "supertest";

export class EmptyLogger implements LoggerService {
  log() {
    return;
  }
  error() {
    return;
  }
  warn() {
    return;
  }
  debug() {
    return;
  }
  verbose() {
    return;
  }
}

export async function prepareFixture() {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();

  // app.useLogger(new EmptyLogger());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.init();

  return app;
}

export async function onTestsEnd(app: INestApplication) {
  const repos = [
    await app.get("InitLoginEntityRepository"),
    await app.get("JWTEntityRepository"),
    await app.get("UserEntityRepository"),
  ];

  for (const repo of repos) {
    await repo.delete({});
  }
}

export function expectApiError(
  response: request.Response,
  status: number,
  message: string,
) {
  expect(response.status).toEqual(status);
  expect(response.body.statusCode).toEqual(status);
  expect(response.body.message).toEqual(message);
}
