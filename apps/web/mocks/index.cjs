/**
 * NOTE: 현재 4월 5일 기준 13 버전에서는 MSW가 매우 불안정하다. 이를 추후 수정해야 한다. 이유는 레이스 컨디션에 대한 업데이트가 13버전에서 이루어졌기 때문이다.
 * 이는 아래의 이슈에서 확인할 수 있다.
 *
 * @see: https://github.com/vercel/next.js/issues/43284
 */

function initMocks() {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
      require('./server').then((s) => s.server.listen());
    } else {
      const { worker } = require('./browser');
      worker.start({
        onUnhandledRequest: 'bypass',
      });
    }
  }
}

initMocks();
