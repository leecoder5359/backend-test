import { Request } from 'express';

export const RATE_LIMIT_SERVICE = Symbol('RATE_LIMIT_SERVICE');

export interface IRateLimitService {
  handleRequestPerUser(req: Request): Promise<void>;
  processQueue(): void;
}
