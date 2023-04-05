// src/mocks/handlers.js
import { rest } from 'msw';

import { APIPaths } from '@apis/paths';

export const handlers = [
  rest.get(APIPaths.getTemplates, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          imageSrc: '/naver-login.svg',
          imageAlt: 'image',
          title: '타이틀입니다.',
          nickname: '불량한 너구리1',
          likeCount: '999',
          liked: false,
          authorProfileUrl: '/naver-login.svg',
        },
        {
          id: '2',
          imageSrc: '/naver-login.svg',
          imageAlt: 'image',
          title: '타이틀입니다.',
          nickname: '불량한 너구리2',
          likeCount: '999',
          liked: false,
          authorProfileUrl: '/naver-login.svg',
        },
        {
          id: '3',
          imageSrc: '/naver-login.svg',
          imageAlt: 'image',
          title: '타이틀입니다.',
          nickname: '불량한 너구리3',
          likeCount: '999',
          liked: false,
          authorProfileUrl: '/naver-login.svg',
        },
        {
          id: '4',
          imageSrc: '/naver-login.svg',
          imageAlt: 'image',
          title: '타이틀입니다.',
          nickname: '불량한 너구리4',
          likeCount: '999',
          liked: false,
          authorProfileUrl: '/naver-login.svg',
        },
      ])
    );
  }),
];
