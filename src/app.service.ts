import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { JobOptions, JobPayload, TRANSCODING_JOB_TYPE_NAME } from './types';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name, { timestamp: true });

  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addJob(
    payload: JobPayload,
    options: JobOptions = { processingTime: 1 },
  ): Promise<void> {
    this.logger.debug('adding job');

    const job = await this.audioQueue.add(TRANSCODING_JOB_TYPE_NAME, {
      payload,
      options,
    });

    this.logger.debug(`job ${job.id} added`);
  }
}
