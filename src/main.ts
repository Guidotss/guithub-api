import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('GuitHub API');
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  if (envs.app.IS_DEV) {
    const config = new DocumentBuilder()
      .setTitle('GuitHub API')
      .setDescription('The GuitHub API description')
      .setVersion('1.0')
      .addTag('guitHub')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        withCredentials: true,
        requestInterceptor: (req) => {
          req.credentials = 'include';
          return req;
        },
      },
      customSiteTitle: 'GuitHub API Documentation',
      customfavIcon:
        'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      ],
      customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      ],
    });
  }
  await app.listen(envs.app.PORT);
  logger.log(`Server is running on port ${envs.app.PORT}`);
  if (envs.app.IS_DEV) {
    logger.log(
      `Documentacion disponible en http://localhost:${envs.app.PORT}/api/docs`,
    );
  }
}
bootstrap();
