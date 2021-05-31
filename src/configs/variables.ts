export const variables = {
  breakpoints: {
    xs: 600,
    sm: 769,
    md: 960,
    lg: 1200,
    xl: 1366,
  },
  colors: {
    primary: {
      black: '#323232',
      blue: '#1a809f',
      red: '#ac272d',
      gray: '#919191',
    },
    secondary: {
      blue: '#1a80a7',
      black: '#646464',
      gray: '#c8c8c8',
    },
    tertiary: {
      gray: '#ebebeb',
    },
    quaternary: {
      gray: '#969696',
    },
  },
  fontFamily: {
    'yu-gothic': [
      '游ゴシック体',
      'Yu Gothic',
      'YuGothic',
      'ヒラギノ角ゴ Pro',
      'Hiragino Kaku Gothic Pro',
      'メイリオ',
      'Meiryo',
      'MS Pゴシック',
      'MS PGothic',
      'sans-serif',
    ],
    'yu-mincho': [
      '游明朝体',
      'Yu Mincho',
      'YuMincho',
      'ヒラギノ明朝 Pro',
      'Hiragino Mincho Pro',
      'MS P明朝',
      'MS PMincho',
      'serif',
    ],
  },
} as const;

export type variablesType = typeof variables;

export type breakpointsNamesType = keyof variablesType['breakpoints'];
