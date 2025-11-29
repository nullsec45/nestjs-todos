import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  if (process.env.APP_ENV !== 'production'){
    const config = new DocumentBuilder()
                      .setTitle('API Todos')
                      .setDescription('This is an API to manage todos')
                      .setVersion('1.0')
                      .addTag('todos')
                      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs-api', app, documentFactory);
  }

  app.setGlobalPrefix(process.env.PREFIX_VERSION);
  await app.listen(3000);
}
bootstrap();
