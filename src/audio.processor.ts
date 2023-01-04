import {
  OnQueueActive,
  OnQueueCleaned,
  OnQueueCompleted,
  OnQueueDrained,
  OnQueueFailed,
  OnQueueRemoved,
  OnQueueStalled,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { setTimeout } from 'timers/promises';
import { JobData, TRANSCODING_JOB_TYPE_NAME } from './types';

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name, {
    timestamp: true,
  });

  constructor() {
    this.logger.debug('instantiating');
  }

  @Process(TRANSCODING_JOB_TYPE_NAME)
  async transcode(job: Job<JobData>) {
    if (job.data.options.failAfter !== undefined) {
      await setTimeout(job.data.options.failAfter * 1000);
      throw new Error('failing');
    } else {
      await setTimeout(job.data.options.processingTime * 1000);
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} with data ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.debug(`job ${job.id} completed`);
  }

  @OnQueueStalled()
  onStalled(job: Job) {
    this.logger.debug(`job ${job.id} stalled`);
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    this.logger.debug(`job ${job.id} failed`);
  }

  @OnQueueRemoved()
  onRemoved(job: Job) {
    this.logger.debug(`job ${job.id} removed`);
  }

  @OnQueueDrained()
  onDrained() {
    this.logger.debug(`queue drained`);
  }

  @OnQueueCleaned()
  onCleaned() {
    this.logger.debug(`queue cleaned`);
  }
}
