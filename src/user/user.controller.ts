import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.findwithID(Number(id));
  }

}
