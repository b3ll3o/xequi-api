import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipeCustom } from './shared/pipes/validation.pipe.custom';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Xequi')
    .setDescription('Gerenciador de acessos')
    .setVersion('1.0')
    .addTag('xequi')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipeCustom());
  await app.listen(3000);
}
bootstrap();
