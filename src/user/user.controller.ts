import { Controller, Get, Param } from '@nestjs/common';
import { PassAuth } from 'src/auth/guards/pass-auth.guard';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth() // Bearer Auth on Swagger UI
@ApiTags('User') // Tag for API on Swagger UI
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @PassAuth() // allows access to this route without authentication
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.findwithID(Number(id));
  }

}
