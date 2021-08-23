import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
//import HttpError from "exception/HttpError";
import Axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();

        const accessToken: string = request.headers.authorization;
        
        if(accessToken === undefined){
            throw new BadRequestException('Token X');
        }

        request.user = await this.validateToken(accessToken.substring(6));
        if(!request.user.id){
            return false;
        }
        return true;
    }

    async validateToken(token: string){
        
        const user = await Axios.get('https://kapi.kakao.com/v2/user/me',
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return user.data;
    }
}