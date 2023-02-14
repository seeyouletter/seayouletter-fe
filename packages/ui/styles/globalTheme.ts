const globalFontSize = {
  h1: '80px',
  h2: '64px',
  h3: '48px',
  h4: '40px',
  h5: '32px',
  h6: '24px',
  xxl: '24px',
  xl: '20px',
  lg: '18px',
  md: '16px',
  sm: '14px',
  xs: '12px',
};

const globalFontWeight = {
  extrabold: 900,
  bold: 700,
  default: 400,
  light: 300,
};

const globalColor = {
  /**
   * @inner
   * 사용성이 편하도록 기본값은 idx 0으로 설정합니다.(이러면 보통 중간값인 5가 디폴트임을 쉽게 알 수 있습니다.)
   * NOTE: 수정 - chakra-ui에서 버튼의 색상 키는 고정되어 있습니다. (light: 500, dark: 200)
   *
   * @see: https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/button.ts
   */
  primary: {
    0: '#009B9F',
    100: '#C8FAEA',
    200: '#93F5DE',
    300: '#5AE2CE',
    400: '#31C5BC',
    500: '#009B9F',
    600: '#007988',
    700: '#005C72',
    800: '#00425C',
    900: '#00304C',
  },
  sub: {
    0: '#DDDDDD',
    100: '#FAFAFA',
    200: '#EFEFEF',
    300: '#EAEAEA',
    400: '#DFDFDF',
    500: '#DDDDDD',
    600: '#CCCCCC',
    700: '#BBBBBB',
    800: '#AAAAAA',
    900: '#999999',
  },
  kakao: {
    200: '#F7E600',
    500: '#F7E600',
    icon: '#3A1D1D',
  },
  naver: {
    200: '#00C73C',
    500: '#00C73C',
    icon: '#FFFFFF',
  },
  error: '#FF6D6D',
  warning: '#FF9255',
  success: '#009B9F',
  text: '#111111',
  dark: '#111',
  semiDark: '#333',
  darkGray: '#555',
  white: '#FFFFFF',

  layout: {
    page: '#F7F7F7',
    blockGroupToggle: {
      bg: 'transparent',
      activeBg: '#444',
      childrenBg: '#333',
    },
  },

  transparent: 'transparent',
};

const globalBorder = {
  default: '1px solid #DDDDDD',
  darkGray: '1px solid #555555',
  primary: `1px solid ${globalColor.primary[500]}`,
  primaryLight: `1px solid ${globalColor.primary[500]}`,
  transparent: `1px solid ${globalColor.transparent}`,
};

const globalBorderRadius = {
  default: '10px',
  rounded: '20px',
  soft: '10px',
  hard: '5px',
  round: '50%',
};

const globalLayouts = {
  header: {
    height: '60px',
  },
  templateCreateToolbar: {
    height: '40px',
  },
  footer: {
    height: '250px',
  },
  banner: {
    height: '160px',
  },
  templateCreateSidebar: {
    width: '260px',
    bg: '#222222',
  },
};

export const globalTheme = {
  fontSize: globalFontSize,
  fontWeight: globalFontWeight,
  color: globalColor,
  border: globalBorder,
  borderRadius: globalBorderRadius,
  layout: globalLayouts,
};

export const hi = {
  ...globalTheme,
};

export type CustomTheme = typeof globalTheme;
