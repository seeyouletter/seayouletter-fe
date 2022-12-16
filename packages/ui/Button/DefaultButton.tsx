import React from 'react';

import styled from '@emotion/styled';

import { Button, VStack } from '@chakra-ui/react';

interface ButtonPropsInterface {
  size: 'xs' | 'sm' | 'md' | 'lg';
  isLoading: boolean;
  children: React.ReactNode;
}

const Div = styled.div`
  width: 2px;
  height: 1px;
`;

export const DefaultButton = ({ size, isLoading = false, children }: ButtonPropsInterface) => {
  return (
    <Button isLoading={isLoading} size={size}>
      {children}
      <VStack>wefewwe</VStack>
      <div></div>
    </Button>
  );
};
