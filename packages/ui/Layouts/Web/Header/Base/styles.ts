import styled from '@emotion/styled';

export const BaseHeaderContainer = styled.header`
  position: fixed;

  top: 0;
  right: 0;
  left: 0;

  z-index: 1000;

  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.color.white};
  /* border-bottom: ${(props) => props.theme.border.default}; */
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
`;
