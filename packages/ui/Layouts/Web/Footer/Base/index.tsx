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
            <StyledDefaultLink href="/about/culture" color="text" noUnderline={false}>
              문화
            </StyledDefaultLink>
            <StyledDefaultLink href="/about/union" color="text" noUnderline={false}>
              씨유레터
            </StyledDefaultLink>
            <StyledDefaultLink href="/about/history" color="text" noUnderline={false}>
              히스토리
            </StyledDefaultLink>
          </VStack>
          <VStack>
            <h6>소식</h6>
            <StyledDefaultLink href="/about/event" color="text" noUnderline={false}>
              이벤트
            </StyledDefaultLink>
            <StyledExternalLink href="/about/notice" color="text" noUnderline={false}>
              공지사항
            </StyledExternalLink>
            <StyledExternalLink href="/about/update" color="text" noUnderline={false}>
              업데이트
            </StyledExternalLink>
          </VStack>
          <VStack>
            <h6>기술과 서비스</h6>
            <StyledDefaultLink href="/about/culture" color="text" noUnderline={false}>
              이용약관
            </StyledDefaultLink>
            <StyledDefaultLink href="/about/union" color="text" noUnderline={false}>
              FAQ
            </StyledDefaultLink>
            <StyledDefaultLink href="/about/history" color="text" noUnderline={false}>
              고객센터
            </StyledDefaultLink>
            <StyledDefaultLink href="/about/history" color="text" noUnderline={false}>
              개인정보 처리방침
            </StyledDefaultLink>
            <StyledDefaultLink href="/about/history" color="text" noUnderline={false}>
              권리침해 신고안내
            </StyledDefaultLink>
          </VStack>
          <VStack>
            <h6>레퍼런스</h6>
            <StyledDefaultLink href="/about/culture" color="text" noUnderline={false}>
              GitHub
            </StyledDefaultLink>
            <StyledDefaultLink href="/about/union" color="text" noUnderline={false}>
              FE
            </StyledDefaultLink>
            <StyledDefaultLink href="/about/history" color="text" noUnderline={false}>
              BE
            </StyledDefaultLink>
          </VStack>
        </StyledLinks>
      </StyledFooterInner>
    </StyledFooterContainer>
  );
};
