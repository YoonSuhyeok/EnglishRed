import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Page } from './entity/page.entity';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page]), UserModule],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService]
})
export class PageModule {}
