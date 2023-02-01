import { PropsWithChildren } from 'react';

import { MenuItem as ChakraMenuItem } from '@chakra-ui/react';

import styled from '@emotion/styled';

const StyledMenuItem = styled(ChakraMenuItem)`
  :focus,
  :active,
  :hover {
    color: white;
    background-color: ${(props) => props.theme.color.primary[500]};
    transition: all 0.2s;
  }
`;
export function MenuItem({ children }: PropsWithChildren) {
  return <StyledMenuItem>{children}</StyledMenuItem>;
}
