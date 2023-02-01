import { useAtom } from 'jotai';

import { resizablePageAtom } from '@atoms/index';

import { SizeType } from 'ui';

interface UseResizablePageParams {
  width: SizeType;
  height: SizeType;
  scale: SizeType;
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

  const setPageScale = ({ scale }: { scale: UseResizablePageParams['scale'] }) => {
    setResizablePageState((state) => ({
      ...state,
      scale,
    }));
  };

  return {
    pageState: resizablePageState,
    setPageWidth,
    setPageHeight,
    setPageScale,
  };
};
