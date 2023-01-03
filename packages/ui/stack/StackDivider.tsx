import React from 'react';

import { StackDivider } from '@chakra-ui/react';

interface DefaultStackDivider {
  dividerColor: string;
}

/**
 * @param { dividerColor: string; }
 * @returns React.ReactElement;
 */
const DefaultStackDivider = ({ dividerColor }: DefaultStackDivider) => {
  return <StackDivider borderColor={dividerColor}>StackDivider</StackDivider>;
};

export default DefaultStackDivider;
