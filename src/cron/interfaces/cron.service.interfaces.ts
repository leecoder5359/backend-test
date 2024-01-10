export const CRON_SERVICE = Symbol('CRON_SERVICE');

export interface ICronService {
  processRateLimitQueueCron(): void;
}
