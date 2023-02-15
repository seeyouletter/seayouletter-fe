export const throttle = <E extends Event>(cb: (e: E, ...args: unknown[]) => void, delay = 300) => {
  let timerFunc: null | NodeJS.Timeout = null;

  return (e: E, ...args: unknown[]) => {
    if (timerFunc) return;

    timerFunc = setTimeout(() => {
      cb(e, ...args);
      timerFunc = null;
    }, delay);
  };
};
