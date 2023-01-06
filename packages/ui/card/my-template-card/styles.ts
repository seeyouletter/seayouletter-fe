import { css } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';

import { Button, ButtonProps } from '@chakra-ui/react';

export const StyledMyTemplateCardContainer: StyledComponent<ButtonProps> = styled(Button)`
  :hover {
    filter: brightness(0.95);
  }
`;

export const MyTemplateCardDetailBoxCSS = css`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 84px;

  &:after {
    position: absolute;
    right: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    content: '';
    background-color: black;
    opacity: 0.5;
  }
`;
