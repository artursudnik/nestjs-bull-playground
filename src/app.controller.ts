import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add-job')
  async addJob(): Promise<string> {
    await this.appService.addJob({ foo: 'bar' });
    return 'Job added\n';
  }
}
