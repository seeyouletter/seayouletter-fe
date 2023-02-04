import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

export const DefaultBox = React.forwardRef(
  ({ children, ...props }: BoxProps, ref: React.LegacyRef<HTMLDivElement>) => {
    return (
      <Box ref={ref} {...props}>
        {children}
      </Box>
    );
  }
);

DefaultBox.displayName = 'DefaultBox';
