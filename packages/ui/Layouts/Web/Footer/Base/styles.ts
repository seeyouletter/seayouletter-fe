import styled from '@emotion/styled';

export const StyledFooterContainer = styled.footer`
  height: ${(props) => props.theme.layouts.footer.height};
  background-color: ${(props) => props.theme.color.sub[500]};
`;
