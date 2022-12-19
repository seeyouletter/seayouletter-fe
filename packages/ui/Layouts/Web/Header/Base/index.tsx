import { LinkInterface } from 'Link/types';

import { KakaoIcon } from '../../../../Icon';
import { DefaultLink, FullLogoLink } from '../../../../Link';
import {
  BaseHeaderContainer,
  BaseHeaderInner,
  StyledPageLinks,
  StyledUserMenuButton,
} from './styles';

const logoLinkData = {
  href: '/',
};

const pageLinksData = [
  {
    href: '/about',
    children: '씨유레터는',
  },
  {
    href: '/find',
    children: '청첩장 찾기',
  },
  {
    href: '/about',
    children: '청첩장 제작',
  },
  {
    href: '/about',
    children: '청첩장 모음',
  },
];

interface PageLinksPropsInterface {
  pageLinks: LinkInterface[];
}
interface BaseHeaderPropsInterface extends PageLinksPropsInterface {
  logoLink: LinkInterface;
}

export const BasePageLinks = ({ pageLinks }: PageLinksPropsInterface) => {
  return (
    <StyledPageLinks>
      {pageLinks.map((pageLink) => (
        <DefaultLink key={pageLink.href} href={pageLink.href} color="text">
          {pageLink.children}
        </DefaultLink>
      ))}
    </StyledPageLinks>
  );
};

export const BaseHeader = ({
  logoLink = logoLinkData,
  pageLinks = pageLinksData,
}: BaseHeaderPropsInterface) => {
  return (
    <BaseHeaderContainer className="layout__header header">
      <BaseHeaderInner className="header__inner">
        <FullLogoLink href={logoLink.href} />
        <BasePageLinks pageLinks={pageLinks}></BasePageLinks>
        <StyledUserMenuButton>
          <KakaoIcon size="28px" />
        </StyledUserMenuButton>
      </BaseHeaderInner>
    </BaseHeaderContainer>
  );
};
