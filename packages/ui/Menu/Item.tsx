import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { MenuItem as ChakramenuItem } from '@chakra-ui/react';

const StyledMenuItem = styled(ChakramenuItem)`
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
