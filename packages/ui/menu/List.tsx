import { PropsWithChildren } from 'react';

import { MenuList as ChakraMenuList } from '@chakra-ui/react';

import styled from '@emotion/styled';

const StyledMenuList = styled(ChakraMenuList)`
  font-size: 14px;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.1);
`;

export function MenuList({ children }: PropsWithChildren) {
  return <StyledMenuList minWidth="160px">{children}</StyledMenuList>;
}
