/**
 * NOTE: 추후 pnpm이 개선되면 이를 삭제한다.
 */
import type {} from 'node_modules/@types/react';

import { useState } from 'react';

import { Blocks } from 'ui';

export const useBlockBeforeSnapshot = () => {
  const [blockBeforeSnapshot, setBlockBeforeSnapshot] = useState<Blocks | null>(null);

  const initializeBlockBeforeSnapshot = () => {
    setBlockBeforeSnapshot(() => null);
  };

  return {
    blockBeforeSnapshot,
    setBlockBeforeSnapshot,
    initializeBlockBeforeSnapshot,
  };
};
