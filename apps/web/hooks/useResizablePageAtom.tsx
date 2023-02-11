import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { resizablePageAtom } from '@atoms/index';

import { SizeType } from 'ui';

interface UseResizablePageParams {
  width: SizeType;
  height: SizeType;
  top: SizeType;
  left: SizeType;
  scale: SizeType;
  scrollY: number;
}

export const useResizablePageAtom = () => {
  const [resizablePageState, setResizablePageState] = useAtom(resizablePageAtom);

  const setPageWidth = ({ width }: { width: UseResizablePageParams['width'] }) => {
    setResizablePageState((state) => ({
      ...state,
      width,
    }));
  };

  const setPageHeight = ({ height }: { height: UseResizablePageParams['height'] }) => {
    setResizablePageState((state) => ({
      ...state,
      height,
    }));
  };

  const setPageTop = ({ top }: { top: UseResizablePageParams['top'] }) => {
    setResizablePageState((state) => ({
      ...state,
      top,
    }));
  };

  const setPageLeft = ({ left }: { left: UseResizablePageParams['left'] }) => {
    setResizablePageState((state) => ({
      ...state,
      left,
    }));
  };

  const setPageScale = ({ scale }: { scale: UseResizablePageParams['scale'] }) => {
    setResizablePageState((state) => ({
      ...state,
      scale,
    }));
  };

  useEffect(() => {
    const scrollHandler = () => {
      setResizablePageState((state) => ({
        ...state,
        scrollY: window.scrollY,
      }));
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pageState: resizablePageState,
    setPageWidth,
    setPageHeight,
    setPageScale,
    setPageTop,
    setPageLeft,
  };
};
