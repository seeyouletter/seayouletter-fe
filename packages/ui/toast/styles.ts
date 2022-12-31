import styled from '@emotion/styled';

import { ToastBoxInterface } from './types';

/** ToastBoxList  */

const StyledToastBoxListTop = styled.section`
  position: fixed;

  display: flex;
  flex-direction: column-reverse;
`;

export const StyledToastBoxList = {
  top: StyledToastBoxListTop,
};

/** ToastBox */
const StyledToastContainer = styled.div<{ type: ToastBoxInterface['type'] }>`
  display: flex;
  align-items: center;

  width: 300px;
  min-height: 48px;
  padding: 0 12px;
  background-color: ${({ theme, type }) => theme.color[type]};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const StyledToastIconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
`;

const StyledToastCopyBox = styled.div`
  width: 100%;
  height: 100%;
`;
const StyledToastHead = styled.strong`
  display: block;
  margin-bottom: 4px;
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.color.white};
  text-align: center;
`;

const StyledToastCopy = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontSize.xs};
  color: ${(props) => props.theme.color.white};
  text-align: center;
`;

export const StyledToast = {
  Container: StyledToastContainer,
  IconBox: StyledToastIconContainer,
  CopyBox: StyledToastCopyBox,
  Head: StyledToastHead,
  Description: StyledToastCopy,
};
