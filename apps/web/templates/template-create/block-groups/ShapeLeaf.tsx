import React from 'react';

import { Blocks } from 'ui';

interface ShapeLeafPropsInterface {
  data: Blocks;
}

export function ShapeLeaf({ data }: ShapeLeafPropsInterface) {
  return <div>{data.id}</div>;
}
