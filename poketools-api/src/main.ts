import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaNotFoundExceptionFilter } from './exception-filters/prisma-not-founde.exception-filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function server() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
    })
  );
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Poketools API')
    .setDescription('API destinada a fornecer dados dos pokemons.')
    .setVersion('1.0')
    .addTag('Aplication ')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3333);
}
server();
