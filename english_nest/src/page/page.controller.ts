import { BadRequestException, Get, Patch } from '@nestjs/common';
import { Controller, Post, Body, Query } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto copy';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
    constructor(private readonly pageService: PageService){}
    
    @Post()
    crate(@Body() data: CreatePageDto){
        console.log(data);
        const page = this.pageService.createAndUpdate(data);
        if(!page){
            throw new BadRequestException('user does not exist');
        }
        return page;
    }

    @Get()
    finds(@Query('userId') userId: string){
        const page = this.pageService.find(userId);
        if(!page){ throw new BadRequestException('user does not exist')}
        return page;
    }

    @Patch()
    update(@Query('userId') userId: string, @Body() data: UpdatePageDto){
        return this.pageService.update(data, userId);
    }
}
