import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //프록시 처리
  @Get()
  proxy(@Req() req: Request) {
    return this.appService.proxy(req);
  }

  @Get('challenge1')
  challenge1(): number {
    return this.appService.challenge1();
  }

  @Get('challenge2')
  challenge2(): number {
    return this.appService.challenge2();
  }
}
