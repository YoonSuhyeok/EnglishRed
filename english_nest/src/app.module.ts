import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { PageModule } from './page/page.module';
import { Page } from './page/entity/page.entity';
import { WordModule } from './word/word.module';
import { Word } from './word/entity/word.entity';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'english_red',
    entities: [User, Page, Word],
    charset: 'utf8mb4_unicode_ci',
    synchronize: true
  }),
  AuthModule,
  UserModule,
  PageModule,
  WordModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
