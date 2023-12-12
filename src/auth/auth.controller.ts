import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { PassAuth } from './guards/pass-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';

@PassAuth()
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() authDto: AuthDto, @Res() res, @Req() req) {
        return await this.authService.login(req.user, res);
    }

    @Post('register')
    async register(@Body() data: UserDto, @Res() res) {
        return await this.authService.createUser(data, res);
    }
}

