import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import {
  IRateLimitService,
  RATE_LIMIT_SERVICE,
} from './rate-limit/interfaces/rate-limit.service.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject(RATE_LIMIT_SERVICE) private rateLimitService: IRateLimitService,
  ) {}

  async proxy(req: Request) {
    await this.rateLimitService.handleRequestPerUser(req);
  }

  /**
   * 코딩 테스트 - 1: 상품 카테고리 매칭
   *
   * 목표
   * 상품을 수집할 때 제공된 키워드를 기반으로 카테고리 목록과 매칭하여 상품에 카테고리 정보를 연결하는 프로세스를 구현합니다.
   */
  challenge1(): any {
    //함수 실행 시간 반환
    const categoryList = [
      { id: 1, name: '가구' },
      { id: 2, name: '공구' },
      { id: 3, name: '의류' },
    ];
    [...new Array(10000)].forEach((_, index) => {
      categoryList.push({ id: index + 4, name: `카테고리${index + 4}` });
    });

    const product = {
      id: 1,
      name: '의자',
      keyword: '가구',
    };

    const start = Date.now();

    const matchCategory = categoryList.find(
      (category) => category.name === product.keyword,
    );

    if (!matchCategory) {
      throw new Error(`키워드(${product.keyword})에 맞는 카테고리가 없습니다.`);
    }

    const end = Date.now();
    console.log('실행 시간: ', end - start);

    return {
      product: {
        name: product.name,
        category: {
          id: matchCategory.id,
          name: matchCategory.name,
        },
      },
    };
  }

  /**
   * 코딩 테스트 - 2: 단어 치환
   *
   * 목표
   * 옵션 이름에 나타난 특정 단어들을 주어진 단어 치환 목록을 사용하여 변경합니다.
   */
  challenge2(): any {
    const translateWordList = [
      { src: '블랙', dest: '검정색' },
      { src: '레드', dest: '빨간색' },
    ];
    [...new Array(10000)].forEach((_, index) => {
      translateWordList.push({ src: index.toString(), dest: `A` });
    });

    const optionList = [
      { id: 1, name: '블랙 XL' },
      { id: 2, name: '블랙 L' },
      { id: 3, name: '블랙 M' },
      { id: 4, name: '레드 XL' },
      { id: 5, name: '레드 L' },
      { id: 6, name: '레드 M' },
    ];
    [...new Array(50)].forEach((_, index) => {
      optionList.push({ id: index + 7, name: `블랙 ${index + 7}` });
    });

    const start = Date.now();

    const updatedOptionList = optionList.map((option) => {
      let updatedName = option.name;

      translateWordList.forEach((word) => {
        updatedName = updatedName.replace(word.src, word.dest);
      });

      return { ...option, name: updatedName };
    });

    const end = Date.now();
    console.log('실행 시간: ', end - start);
    return updatedOptionList;
  }
}
