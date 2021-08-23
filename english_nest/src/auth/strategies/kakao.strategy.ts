import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao'
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
config();

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(){
        super(
            {
                clientID: '',
                callbackURL: 'http://localhost:50000/login/callback'
            }
        );
    }
    
    async validate(accessToken:string, refreshToken:string, profile:any, done){
        done(null, { accessToken, refreshToken, profile});
    }

}