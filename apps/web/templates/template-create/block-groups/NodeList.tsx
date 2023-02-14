import React from 'react';

import { ImageLeaf } from './ImageLeaf';

/* eslint-disable-next-line import/no-cycle */
import { Node } from './Node';
import { ShapeLeaf } from './ShapeLeaf';
import { TextLeaf } from './TextLeaf';
import { NodeItemFactoryPropsInterface, NodeListPropsInterface } from './types';

function NodeItemFactory({ item, depth, order }: NodeItemFactoryPropsInterface) {
  if (item.type === 'group') {
    return <Node data={item} depth={depth} order={order} />;
  } else {
    if (item.subType === 'shape') {
      return <ShapeLeaf data={item} depth={depth} order={order} />;
    }
    if (item.subType === 'image') {
      return <ImageLeaf data={item} depth={depth} order={order} />;
    } else {
      return <TextLeaf data={item} depth={depth} order={order} />;
    }
  }
}

export function NodeList({ depth, listItems }: NodeListPropsInterface) {
  return (
    <>
      {listItems.map((item, index) => (
        <NodeItemFactory depth={depth} key={item.id} item={item} order={index} />
      ))}
    </>
  );
}
