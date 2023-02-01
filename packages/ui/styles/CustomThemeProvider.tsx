import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { ThemeProvider } from '@emotion/react';
import { Global } from '@emotion/react';

import { chakraTheme } from '@ui/styles/chakraTheme';
import { globalStyle } from '@ui/styles/globalStyle';
import { globalTheme } from '@ui/styles/globalTheme';

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={globalTheme}>
      <ChakraProvider theme={chakraTheme}>
        <Global styles={globalStyle} />
        {children}
      </ChakraProvider>
    </ThemeProvider>
  );
}
