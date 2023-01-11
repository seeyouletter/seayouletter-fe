import React from 'react';

import { Tooltip, TooltipProps } from '@chakra-ui/react';

interface DefaultTooltipPropsInterface extends TooltipProps {
  ariaLabel: string;
  arrowShadowColor: string;
  arrowSize?: number;
  closeOnClick?: boolean;
  closeOnEsc?: boolean;
  defaultIsOpen?: boolean;
  placement?: TooltipProps['placement'];
  onOpen?: () => void;
  isOpen?: boolean;
}
export default function DefaultTooltip({
  ariaLabel,
  children,
  arrowSize = 8,
  closeOnClick = true,
  closeOnEsc = false,
  defaultIsOpen = false,
  colorScheme = 'dark',
  placement = 'bottom',
  onOpen,
  onClose,
  isOpen,
  ...props
}: DefaultTooltipPropsInterface) {
  return (
    <Tooltip
      {...props}
      ariaLabel={ariaLabel}
      arrowSize={arrowSize}
      arrowPadding={8}
      closeOnClick={closeOnClick}
      closeOnEsc={closeOnEsc}
      colorScheme={colorScheme}
      defaultIsOpen={defaultIsOpen}
      placement={placement}
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
    >
      {children}
    </Tooltip>
  );
}
