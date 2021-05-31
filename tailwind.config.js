/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('./tailwind/base');
const {createSafeList} = require('./tailwind');
/* eslint-disable @typescript-eslint/no-var-requires */

const defaultVariant = ['responsive'];
const hoverVariant = [...defaultVariant, 'group-hover', 'group-focus', 'hover', 'focus'];

module.exports = {
  ...base,
  ...{
    purge: {
      content: ['./src/**/*.tsx', './src/**/*.ts'],
      options: {
        safelist: createSafeList('block', 'hidden'),
        keyframes: true,
      },
    },
    // mode: 'jit',
    darkMode: false, // or 'media' or 'class'
    /**s
     * @see https://tailwindcss.jp/docs/configuration
     */
    corePlugins: [
      'margin',
      'padding',
      'textColor'
    ],
  },
};
