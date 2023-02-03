import { useAtom } from 'jotai';

import { initialBlockCreationState, templateCreateToolbarAtom } from '@atoms/index';

export const useTemplateCreateToolbar = () => {
  const [toolbarState, setToolbarState] = useAtom(templateCreateToolbarAtom);

  const setBlockCreationActive = () => {
    setToolbarState((state) => ({
      ...state,
      blockCreation: {
        ...state.blockCreation,
        type: 'block',
        width: 100,
        height: 100,
      },
    }));
  };

  const setTextCreationActive = () => {
    setToolbarState((state) => ({
      ...state,
      blockCreation: {
        ...state.blockCreation,
        type: 'text',
        width: 16,
        height: 16,
      },
    }));
  };

  const initializeBlockCreation = () => {
    setToolbarState((state) => ({
      ...state,
      blockCreation: { ...initialBlockCreationState },
    }));
  };

  return {
    blockCreationState: toolbarState.blockCreation,
    setBlockCreationActive,
    setTextCreationActive,
    initializeBlockCreation,
  };
};
