import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto copy';
import { Page } from './entity/page.entity';

@Injectable()
export class PageService {
    constructor(
        @InjectRepository(Page)
        private readonly pageRepository: Repository<Page>,
        private readonly userService: UserService
    ){}

    async createAndUpdate(data: CreatePageDto){
        const user = await this.userService.find(data.userId);
        if(!user) return false;

        this.pageRepository.save({
            name: data.name,
            user: user
        });
    }

    async find(userId: string){
        const user = await this.userService.find(userId);
        if(!user) return false;

        return this.pageRepository.find({
            where: { user }
        });
    }

    async findForUser(pageName: string, user: User){
        return this.pageRepository.findOne({
            where: { user: user, name: pageName }
        });
    }

    async update(data: UpdatePageDto, userId: string){
        const user = await this.userService.find(userId);
        const page = await this.pageRepository.findOne({
            where: { user: user, name: data.name } });        
        page.name = data.newName;
        return this.pageRepository.save(page);
    }
}
