import React from 'react';

import { ImageLeaf } from './ImageLeaf';

/* eslint-disable-next-line import/no-cycle */
import { Node } from './Node';
import { ShapeLeaf } from './ShapeLeaf';
import { TextLeaf } from './TextLeaf';
import { NodeItemFactoryPropsInterface, NodeListPropsInterface } from './types';

function NodeItemFactory({ item }: NodeItemFactoryPropsInterface) {
  if (item.type === 'group') {
    return <Node data={item} />;
  } else {
    if (item.subType === 'shape') {
      return <ShapeLeaf data={item} />;
    }
    if (item.subType === 'image') {
      return <ImageLeaf data={item} />;
    } else {
      return <TextLeaf data={item} />;
    }
  }
}

export function NodeList({ listItems }: NodeListPropsInterface) {
  return (
    <>
      {listItems.map((item) => (
        <NodeItemFactory key={item.id} item={item} />
      ))}
    </>
  );
}
