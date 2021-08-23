import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entity/word.entity';
import { PageModule } from 'src/page/page.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Word]), PageModule, UserModule],
  providers: [WordService],
  controllers: [WordController]
})
export class WordModule {}
