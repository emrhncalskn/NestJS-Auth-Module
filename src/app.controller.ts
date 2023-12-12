import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PassAuth } from './auth/guards/pass-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @PassAuth() // no auth required
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
