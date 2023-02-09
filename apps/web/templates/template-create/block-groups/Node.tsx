import React from 'react';

import { Groups } from 'ui';

/**
 * NOTE: 재귀적으로 블록을 렌더링하기 위해 설정했다.
 */

/* eslint-disable-next-line import/no-cycle */
import { NodeList } from './NodeList';

interface NodePropsInterface {
  data: Groups;
}
export function Node({ data }: NodePropsInterface) {
  return (
    <div>
      <NodeList listItems={data.blocks}></NodeList>
    </div>
  );
}
