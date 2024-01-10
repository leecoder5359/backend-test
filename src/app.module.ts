import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimitModule } from './rate-limit/rate-limit.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [RateLimitModule, CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
