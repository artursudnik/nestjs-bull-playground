import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add-job/immediate')
  async addJobImmediate(): Promise<string> {
    const jobId = await this.appService.addJob(
      { foo: 'immediate' },
      { processingTime: 0 },
    );

    return `Job ${jobId} added\n`;
  }

  @Post('add-job/failing-immediately')
  async addJobFailingImmediately(): Promise<string> {
    const jobId = await this.appService.addJob(
      { foo: 'failing immediately' },
      { failAfter: 0, processingTime: 0 },
    );

    return `Job ${jobId} added\n`;
  }

  @Post('add-job/delayed/:delay')
  async addJobDelayed(@Param('delay') delay: string): Promise<string> {
    if (isNaN(parseInt(delay))) {
      throw new NotFoundException();
    }

    const jobId = await this.appService.addJob(
      { foo: `delayed by ${delay}s` },
      { processingTime: parseInt(delay) },
    );

    return `Job ${jobId} added\n`;
  }

  @Post('add-job/failing-delayed/:delay')
  async addJobFailingDelayed(@Param('delay') delay: string): Promise<string> {
    if (isNaN(parseInt(delay))) {
      throw new NotFoundException();
    }

    const jobId = await this.appService.addJob(
      { foo: `failing delayed by ${delay}s` },
      { processingTime: 0, failAfter: parseInt(delay) },
    );

    return `Job ${jobId} added\n`;
  }
}
