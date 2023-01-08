import Image from 'next/image';

import styled from '@emotion/styled';

import { FullLogoLink } from '@ui/link';
import { LinkInterface } from '@ui/link/types';
import { Menu, MenuIconButton, MenuItem, MenuList } from '@ui/menu';

import { BaseHeaderContainer, BaseHeaderInner, StyledPageLink, StyledPageLinks } from './styles';

interface PageLinksPropsInterface {
  pageLinks: LinkInterface[];
}
interface BaseHeaderPropsInterface extends PageLinksPropsInterface {
  logoLink: LinkInterface;
  user: {
    profileUrl: string;
  };
}

export const BasePageLinks = ({ pageLinks }: PageLinksPropsInterface) => {
  return (
    <StyledPageLinks>
      {pageLinks.map((pageLink) => (
        <StyledPageLink
          key={pageLink.href}
          href={pageLink.href}
          color="text"
          activeColor="primary.500"
          noUnderline
        >
          {pageLink.children}
        </StyledPageLink>
      ))}
    </StyledPageLinks>
  );
};

const UserProfile = styled(Image)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const BaseHeader = ({ logoLink, pageLinks, user }: BaseHeaderPropsInterface) => {
  return (
    <BaseHeaderContainer className="layout__header header">
      <BaseHeaderInner className="header__inner">
        <FullLogoLink href={logoLink.href} />
        <BasePageLinks pageLinks={pageLinks}></BasePageLinks>

        <Menu>
          <MenuIconButton>
            <UserProfile
              loader={() => user.profileUrl}
              src={user.profileUrl}
              alt="user"
              width={32}
              height={32}
            />
          </MenuIconButton>

          <MenuList>
            <MenuItem>내 정보 보기</MenuItem>
            <MenuItem>로그아웃</MenuItem>
          </MenuList>
        </Menu>
      </BaseHeaderInner>
    </BaseHeaderContainer>
  );
};
