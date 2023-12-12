import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Encryptor } from '../../services/encyrption/encyrpt-data';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { ErrorMessages } from 'constants/messages';

const encrypt = new Encryptor;

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {

        const user = await this.userService.findOneWithEmail(email);
        if (user && (await encrypt.isPasswordCorrect(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(userInfo: User, res: any) {
        const { password, ...user } = userInfo;
        const payload = {
            id: user.id
        }
        return res.status(200).json({
            user: user,
            accessToken: this.jwtService.sign(payload),
        })
    }

    async createUser(userDto: UserDto, res: any) {
        const checkEmail = await this.userService.findOneWithEmail(userDto.email);
        if (checkEmail) return res.status(400).json({ message: ErrorMessages.EMAIL_ALREADY_EXISTS() });

        const user = await this.userService.create(userDto);
        await this.login(user, res);
    }

}

//hdi bırk 
