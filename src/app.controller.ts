import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth() // Bearer Auth on Swagger UI
@ApiTags('App') // Tag for API on Swagger UI
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  authCheck() {
    return this.appService.authCheck();
  }

}
