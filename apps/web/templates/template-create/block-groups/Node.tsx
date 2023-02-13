import React from 'react';

import { DefaultBox, Groups } from 'ui';

/**
 * NOTE: 재귀적으로 블록을 렌더링하기 위해 설정했다.
 */

/* eslint-disable-next-line import/no-cycle */
import { NodeList } from './NodeList';

interface NodePropsInterface {
  data: Groups;
  depth: number;
  order: number;
}

export function Node({ data, depth, order }: NodePropsInterface) {
  return (
    <DefaultBox id={data.id} data-order={order}>
      <NodeList depth={depth} listItems={data.blocks} />
      {data.id}
    </DefaultBox>
  );
}
