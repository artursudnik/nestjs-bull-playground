import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { TRANSCODING_JOB_TYPE_NAME } from './types';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name, { timestamp: true });

  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addJob(): Promise<void> {
    this.logger.debug('adding job');

    const job = await this.audioQueue.add(TRANSCODING_JOB_TYPE_NAME, {
      foo: 'bar',
    });

    this.logger.debug(`job ${job.id} added`);
  }
}
