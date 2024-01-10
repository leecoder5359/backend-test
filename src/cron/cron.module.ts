import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RateLimitModule } from 'src/rate-limit/rate-limit.module';

@Module({
  imports: [ScheduleModule.forRoot(), RateLimitModule],
  providers: [CronService],
})
export class CronModule {}
