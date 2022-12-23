import { CSSProp } from '@emotion/react';

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}
