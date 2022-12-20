import React from 'react';

import { VStack } from '@chakra-ui/react';

import { Logo } from '../../../../Icon';
import {
  StyledDefaultLink,
  StyledExternalLink,
  StyledFooterContainer,
  StyledFooterInner,
  StyledLinks,
} from './styles';

const infos = [
  {
    href: '/about/culture',
    label: '문화',
  },
  {
    href: '/about/culture',
    label: '히스토리',
  },
  {
    href: '/about/culture',
    label: '씨유레터',
  },
];

const news = [
  {
    href: '/event',
    label: '이벤트',
  },
  {
    href: '/notice',
    label: '공지사항',
  },
  {
    href: '/update',
    label: '업데이트',
  },
];

const techsAndServices = [
  {
    href: '/terms-of-agreement',
    label: '이용약관',
  },
  {
    href: '/FAQ',
    label: 'FAQ',
  },
  {
    href: '/customer-service',
    label: '고객센터',
  },
  {
    href: '/private-info-administration',
    label: '개인정보 처리방침',
  },
  {
    href: '/report',
    label: '권리침해 신고안내',
  },
];

const references = [
  {
    href: 'https://github.com/seeyouletter',
    label: 'GitHub',
  },
  {
    href: 'https://github.com/seeyouletter/seeyouletter-fe',
    label: 'FE',
  },
  {
    href: 'https://github.com/seeyouletter/seeyouletter-be',
    label: 'BE',
  },
];

const checkIsDefaultLink = (href: string) => {
  return href.startsWith('/');
};

export const BaseFooter = () => {
  return (
    <StyledFooterContainer className="layout__footer">
      <StyledFooterInner>
        <div>
          <Logo />
        </div>

        <StyledLinks as="ul" justify="space-between">
          <VStack>
            <h6>씨유레터</h6>
            {infos.map((info) =>
              checkIsDefaultLink(info.href) ? (
                <StyledDefaultLink href={info.href} color="text" noUnderline={false}>
                  {info.label}
                </StyledDefaultLink>
              ) : (
                <StyledExternalLink href={info.href} color="text" noUnderline={false}>
                  {info.label}
                </StyledExternalLink>
              )
            )}
          </VStack>
          <VStack>
            <h6>소식</h6>
            {news.map((newsLink) =>
              checkIsDefaultLink(newsLink.href) ? (
                <StyledDefaultLink href={newsLink.href} color="text" noUnderline={false}>
                  {newsLink.label}
                </StyledDefaultLink>
              ) : (
                <StyledExternalLink href={newsLink.href} color="text" noUnderline={false}>
                  {newsLink.label}
                </StyledExternalLink>
              )
            )}
          </VStack>
          <VStack>
            <h6>기술과 서비스</h6>
            {techsAndServices.map((techAndService) =>
              checkIsDefaultLink(techAndService.href) ? (
                <StyledDefaultLink href={techAndService.href} color="text" noUnderline={false}>
                  {techAndService.label}
                </StyledDefaultLink>
              ) : (
                <StyledExternalLink href={techAndService.href} color="text" noUnderline={false}>
                  {techAndService.label}
                </StyledExternalLink>
              )
            )}
          </VStack>
          <VStack>
            <h6>레퍼런스</h6>
            {references.map((reference) =>
              checkIsDefaultLink(reference.href) ? (
                <StyledDefaultLink href={reference.href} color="text" noUnderline={false}>
                  {reference.label}
                </StyledDefaultLink>
              ) : (
                <StyledExternalLink href={reference.href} color="text" noUnderline={false}>
                  {reference.label}
                </StyledExternalLink>
              )
            )}
          </VStack>
        </StyledLinks>
      </StyledFooterInner>
    </StyledFooterContainer>
  );
};
