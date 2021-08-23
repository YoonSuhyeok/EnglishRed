import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { KakaoAuthGuard } from './auth/guards/kakao-auth.guard';
import { UserService } from './user/user.service';
import Axios from 'axios';
import { AuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/login')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuth(@Req() req){}

  @Get('/login/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthRedirect(@Req() req, @Res() res){
    const user = await this.userService.find(req.user.profile.id);
    if(!user){
      this.userService.create(req.user.profile.id, req.user.profile.username);
    }
    res.header('Authorization', `Bearer ${req.user.accessToken}`);
    res.header('refreshToken', `Bearer ${req.user.refreshToken}`);
    res.redirect(`http://localhost:3000?code=${req.user.accessToken}`);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() req){
    return {
      id: req.user.id,
      nickname: req.user.properties.nickname
    }
  }

}
