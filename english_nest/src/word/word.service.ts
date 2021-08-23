import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from 'src/page/page.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { Word } from './entity/word.entity';

@Injectable()
export class WordService {
    constructor(
        @InjectRepository(Word)
        private readonly wordRepository: Repository<Word>,
        private readonly pageService: PageService,
        private readonly userService: UserService
    ){}
    
    async createAndUpdate(data: CreateWordDto, userId: string=''){
        const user = await this.userService.find(data.userId);
        if(!user) return 0;
        const page = await this.pageService.findForUser(data.pageName, user);
        if(!page) return 1;
        const word = await this.wordRepository.findOne({where: {page: page}});
        if(!word){
            this.wordRepository.save({
                top: data.top,
                bottom: data.bottom,
                page: page
            });
        }else{
            word.top = data.top;
            word.bottom = data.bottom;
            this.wordRepository.save(word);
        }
    }

    async find(pageName: string, userId: string){
        const user = await this.userService.find(userId);
        if(!user) return 0;
        const page = await this.pageService.findForUser(pageName, user);
        if(!page) return 1;
        console.log(user, page);
        return this.wordRepository.findOne({where:{page:page}});
    }
}
