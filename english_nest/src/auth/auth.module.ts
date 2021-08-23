import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'kakao'}),
        UserModule
    ],
    providers: [KakaoStrategy, AuthService],
    controllers: []
})
export class AuthModule {}
