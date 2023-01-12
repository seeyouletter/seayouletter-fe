import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ModalButtonGroup } from '@ui/buttonGroup';
import { DefaultVStack } from '@ui/stack';
import { DefaultText } from '@ui/text';

import { useMounted } from '@common-hooks/useMounted';

import {
  ModalPropsInterface,
  StyledBackgroundDimInterface,
  StyledModalContainerInterface,
} from './types';

const ModalBackgroundDim = styled.div<StyledBackgroundDimInterface>`
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

  ${({ visible }) =>
    !visible &&
    css`
      display: none;
    `}
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

export default function Modal({
  visible = false,
  width = 'auto',
  title,
  descriptions,
  children,
  onConfirmButtonClick,
  onCancelButtonClick,
}: ModalPropsInterface) {
  const mounted = useMounted();

  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    root.current = document.querySelector('body');
  }, []);

  return mounted
    ? createPortal(
        <ModalBackgroundDim visible={visible}>
          <StyledModalContainer width={width}>
            <DefaultVStack spacing={5}>
              <DefaultVStack textAlign="center" spacing={2}>
                <h6>{title}</h6>
                {descriptions.map((description, idx) => (
                  <DefaultText key={idx}>{description}</DefaultText>
                ))}
              </DefaultVStack>

              {children}

              <ModalButtonGroup
                onConfirmButtonClick={onConfirmButtonClick}
                onCancelButtonClick={onCancelButtonClick}
              />
            </DefaultVStack>
          </StyledModalContainer>
        </ModalBackgroundDim>,
        root.current as HTMLElement
      )
    : null;
}
