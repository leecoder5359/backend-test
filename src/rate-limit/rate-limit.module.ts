import { Module } from '@nestjs/common';
import { RateLimitService } from './rate-limit.service';
import { RATE_LIMIT_SERVICE } from './interfaces/rate-limit.service.interface';

@Module({
  providers: [
    {
      provide: RATE_LIMIT_SERVICE,
      useClass: RateLimitService,
    },
  ],
  exports: [RATE_LIMIT_SERVICE],
})
export class RateLimitModule {}
