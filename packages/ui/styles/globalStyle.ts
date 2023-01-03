import { css } from '@emotion/react';

import { globalTheme } from '@ui/styles/globalTheme';

export const globalStyle = css`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    padding: 0;
    margin: 0;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
    border: 0;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  /*********************************
   *NOTE:    customized styles     *
   *********************************/

  /* stylelint-disable-next-line no-duplicate-selectors */
  body {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    color: #111111;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 700;
    }

    h1 {
      font-size: ${globalTheme?.fontSize?.h1};
    }

    h2 {
      font-size: ${globalTheme?.fontSize?.h2};
    }

    h3 {
      font-size: ${globalTheme?.fontSize?.h3};
    }

    h4 {
      font-size: ${globalTheme?.fontSize?.h4};
    }

    h5 {
      font-size: ${globalTheme?.fontSize?.h5};
      line-height: 1;
    }

    h6 {
      font-size: ${globalTheme?.fontSize?.h6};
    }
  }

  strong {
    font-weight: 700;
  }
`;
