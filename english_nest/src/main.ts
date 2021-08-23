import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true });
  await app.listen(50000);

  app.useGlobalPipes(
    new ValidationPipe({
      // true로 설정하면 아무 데코레이터도 없는 어떠한 property의 object를 거른다.
      whitelist: true,
      // 누군가가 이상한 것을 보내면, 요청 자체를 막을 수 있다.
      forbidNonWhitelisted: true,
      // 유저가 보낸 것을 우리가 원하는 타입으로 변환해준다.
      transform: true,
    })
   );
}
bootstrap();
