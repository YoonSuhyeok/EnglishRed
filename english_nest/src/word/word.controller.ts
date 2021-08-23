import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/local-auth.guard';
import { CreateWordDto } from './dto/create-word.dto';
import { WordService } from './word.service';

@Controller('word')
export class WordController {  
    constructor(private readonly wordService: WordService){}

    @Post()
    createAndUpdate(@Body() data: CreateWordDto, @Req() req){
        this.wordService.createAndUpdate(data);
    }

    @Get()
    find(@Query('pageName') pageName: string, @Query('userId') userId: string){
        return this.wordService.find(pageName, userId);
    }
}
