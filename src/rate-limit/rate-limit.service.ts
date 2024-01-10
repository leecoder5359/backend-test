import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IRateLimitService } from './interfaces/rate-limit.service.interface';

@Injectable()
export class RateLimitService implements IRateLimitService {
  private requestCounts: Map<string, number> = new Map();
  private requestQueue: Request[] = [];

  async handleRequestPerUser(req: Request): Promise<void> {
    const userId = req.headers['id'] as string;
    const count = this.requestCounts.get(userId) || 0;

    if (count < 10) {
      this.requestCounts.set(userId, count + 1);
      return this.processRequest(req);
    }

    this.requestQueue.push(req);
  }

  private processRequest(req: Request): Promise<void> {
    return new Promise((resolve) => {
      //TODO: A 서버로 요청
      resolve();
    });
  }

  processQueue(): void {
    this.requestCounts.clear();

    while (this.requestQueue.length > 0) {
      const req = this.requestQueue.shift();
      if (req) this.handleRequestPerUser(req);
    }
  }
}
