export type CustomTheme = typeof globalTheme;

export const globalTheme = {
  fontSize: {
    h1: '100px',
    h2: '80px',
    h3: '64px',
    h4: '48px',
    h5: '32px',
    h6: '24px',
    xxl: '24px',
    xl: '20px',
    lg: '18px',
    md: '16px',
    sm: '14px',
    xs: '12px',
  },
  fontWeight: {
    extrabold: 900,
    bold: 700,
    default: 400,
    light: 300,
  },
  color: {
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
  },

  border: {
    default: '1px solid #DDDDDD',
  },

  borderRadius: {
    default: '10px',
    rounded: '20px',
    soft: '10px',
    hard: '5px',
    round: '50%',
  },

  layouts: {
    header: {
      height: '60px',
    },
    footer: {
      height: '250px',
    },
    banner: {
      height: '160px',
    },
  },
};
