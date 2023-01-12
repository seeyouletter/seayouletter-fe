import React from 'react';

import { Tooltip, TooltipProps } from '@chakra-ui/react';

interface DefaultTooltipPropsInterface extends TooltipProps {
  ariaLabel?: string;
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
  closeOnClick,
  closeOnEsc,
  defaultIsOpen,
  colorScheme = 'black',
  placement = 'bottom',
  onOpen,
  onClose,
  isOpen,
  hasArrow = true,
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
      hasArrow={hasArrow}
      borderRadius={8}
      padding="8px 12px"
    >
      {children}
    </Tooltip>
  );
}
