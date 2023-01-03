import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { setTimeout } from 'timers/promises';
import { TRANSCODING_JOB_TYPE_NAME } from './types';

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name, {
    timestamp: true,
  });

  constructor() {
    this.logger.debug('instantiating');
  }

  @Process(TRANSCODING_JOB_TYPE_NAME)
  async transcode(job: Job<{ foo: string }>) {
    await setTimeout(1000);
  }
}
