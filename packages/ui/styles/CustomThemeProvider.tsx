import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { Global } from '@emotion/react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { chakraTheme } from './chakraTheme';
import { globalStyle } from './globalStyle';
import { globalTheme } from './globalTheme';

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={globalTheme}>
      <Global styles={globalStyle} />
      <ChakraProvider theme={extendTheme(chakraTheme)}>{children}</ChakraProvider>
    </ThemeProvider>
  );
}
