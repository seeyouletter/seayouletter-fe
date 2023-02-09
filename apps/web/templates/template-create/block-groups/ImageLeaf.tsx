import React from 'react';

import { Blocks } from 'ui';

interface ImageLeafPropsInterface {
  data: Blocks;
}

export function ImageLeaf({ data }: ImageLeafPropsInterface) {
  return <div>{data.id}</div>;
}
