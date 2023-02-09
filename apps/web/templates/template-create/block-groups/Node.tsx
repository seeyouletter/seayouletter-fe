import React from 'react';

import { DefaultBox, Groups } from 'ui';

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
    <DefaultBox id={data.id}>
      <NodeList listItems={data.blocks}></NodeList>
      {data.id}
    </DefaultBox>
  );
}
