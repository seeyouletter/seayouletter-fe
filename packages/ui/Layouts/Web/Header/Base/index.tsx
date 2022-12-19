import { FullLogoLink } from '../../../../Link/FullLogo';
import { BaseHeaderContainer, BaseHeaderInner } from './styles';

export const BaseHeader = () => {
  return (
    <BaseHeaderContainer className="layout__header header">
      <BaseHeaderInner className="header__inner">
        <FullLogoLink href="/" />
      </BaseHeaderInner>
    </BaseHeaderContainer>
  );
};
