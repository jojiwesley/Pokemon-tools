import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaNotFoundExceptionFilter } from './exception-filters/prisma-not-founde.exception-filters';

async function server() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    })
  );
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());
  await app.listen(process.env.PORT ?? 3333);
}
server();
