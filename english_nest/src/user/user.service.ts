import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    create(userId: string, nickname: string){
        return this.userRepository.save({
            userId: userId,
            nickname: nickname
        });
    }

    find(userId: string){
        return this.userRepository.findOne({
            where: {userId: userId}
        });
    }
}
