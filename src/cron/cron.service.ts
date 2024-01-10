import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  IRateLimitService,
  RATE_LIMIT_SERVICE,
} from 'src/rate-limit/interfaces/rate-limit.service.interface';
import { ICronService } from './interfaces/cron.service.interfaces';

@Injectable()
export class CronService implements ICronService {
  constructor(
    @Inject(RATE_LIMIT_SERVICE) private rateLimitService: IRateLimitService,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  processRateLimitQueueCron() {
    this.rateLimitService.processQueue();
  }
}
