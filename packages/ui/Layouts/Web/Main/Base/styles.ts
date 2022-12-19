import styled from '@emotion/styled';

export const StyledBaseMain = styled.main`
  flex: 1;
  min-height: 100%;
  padding-top: ${(props) => props.theme.layouts.header.height};
  background-color: ${(props) => props.theme.color.layouts.page};
`;
