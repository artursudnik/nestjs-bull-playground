import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { AudioProcessor } from './audio.processor';
import * as process from 'process';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'audio',
      defaultJobOptions: {
        removeOnFail: { count: 20, age: 60 },
        removeOnComplete: { count: 20, age: 60 },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AudioProcessor],
})
export class AppModule {}
