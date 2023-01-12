import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { DefaultButton } from '@ui/button';
import { DefaultHStack, DefaultVStack } from '@ui/stack';
import { DefaultText } from '@ui/text';

import { useMounted } from '@common-hooks/useMounted';

interface StyledModalContainerInterface {
  width?: string;
}

interface ModalPropsInterface extends StyledModalContainerInterface {
  title: ReactNode;
  descriptions: string[];
}

const ModalBackgroundDim = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
`;
const StyledModalContainer = styled.div<StyledModalContainerInterface>`
  width: ${({ width }) => width};
  min-width: 304px;
  padding: 20px 32px;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
  opacity: 1;
`;

export default function Modal({ width = 'auto', title, descriptions }: ModalPropsInterface) {
  const theme = useTheme();
  const mounted = useMounted();

  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    root.current = document.querySelector('body');
  }, []);

  return mounted
    ? createPortal(
        <ModalBackgroundDim>
          <StyledModalContainer width={width}>
            <DefaultVStack spacing={5}>
              <DefaultVStack textAlign="center" spacing={2}>
                <h6>{title}</h6>
                {descriptions.map((description, idx) => (
                  <DefaultText key={idx}>{description}</DefaultText>
                ))}
              </DefaultVStack>

              <DefaultHStack width="240px" justifyContent="space-between">
                <DefaultButton width="108px">네</DefaultButton>
                <DefaultButton width="108px" bg={theme.color.error}>
                  아니요
                </DefaultButton>
              </DefaultHStack>
            </DefaultVStack>
          </StyledModalContainer>
        </ModalBackgroundDim>,
        root.current as HTMLElement
      )
    : null;
}
