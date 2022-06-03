const browserContext = 16; // Default

export const rem = (pixels, context = browserContext) => `${pixels / context}rem`;
export const xsMinWidth = 480;
export const desktopViewMinWidth = 768;
export const mdMinWidth = 992;
export const lgMinWidth = 1200;
export const widestMinWidth = 1600;

const spacingUnit = 4;

export const mediaQueries = {
  /** min-width: 480px */
  isXs: `(min-width: ${xsMinWidth}px)`,
  /** min-width: 768px */
  isSm: `(min-width: ${desktopViewMinWidth}px)`,
  /** min-width: 992px */
  isMd: `(min-width: ${mdMinWidth}px)`,
  /** min-width: 1200px */
  isLg: `(min-width: ${lgMinWidth}px)`,
  /** min-width: 1600px */
  isWidest: `(min-width: ${widestMinWidth}px)`,
  /** max-width: 479px */
  isMaxXs: `(max-width: ${xsMinWidth - 1}px)`,
  /** max-width: 767px */
  isMaxSm: `(max-width: ${desktopViewMinWidth - 1}px)`,
  /** max-width: 991px */
  isMaxMd: `(max-width: ${mdMinWidth - 1}px)`,
  /** max-width: 1199px */
  isMaxLg: `(max-width: ${lgMinWidth - 1}px)`,
  /** hover:none */
  hoverNone: `(hover: none)`,
  /** retina mobile screens */
  retinaScreen: `(-webkit-min-device-pixel-ratio: 2)`,
};

// Colors
export const colors = {
  sriracha50: '#ffefeb',
  sriracha100: '#ffcec3',
  sriracha200: '#ffb3a2',
  sriracha300: '#ff967a',
  sriracha400: '#ff7450',
  /** brand color */
  sriracha500: '#ff5328',
  sriracha600: '#e84a23',
  sriracha700: '#d03b16',
  sriracha800: '#b12300',
  sriracha900: '#8a1c00',

  // Navy
  navy50: '#E5E8EE',
  navy100: '#BDC6D7',
  navy200: '#93A0BB',
  navy300: '#6A7CA0',
  navy400: '#4B618E',
  navy500: '#29477E',
  navy600: '#224076',
  navy700: '#19376B',
  navy800: '#132E5E',
  navy900: '#0A1F47',

  // Greys
  neutral50: '#fafbfc',
  neutral100: '#f2f5f7',
  neutral200: '#e6e9ed',
  neutral300: '#d0d3d9',
  neutral350: '#6f7378',
  neutral400: '#a9afba',
  neutral450: '#6e7480',
  neutral500: '#7e8594',
  /** light text */
  neutral550: '#626a78',
  neutral600: '#515b6e',
  neutral700: '#3c475b',
  neutral700Hover: '#282f3c',

  /** dark text */
  neutral800: '#1e293d',
  neutral900: '#000',
  neutral_a: '#9ba2af',

  // Blues
  blue50: '#eceffd',
  blue100: '#e7eafc',
  blue200: '#d1d6f5',
  blue300: '#afb6ec',
  blue400: '#848dde',
  blue500: '#5861cc',
  blue600: '#333db3',
  blue700: '#1a2394',
  blue800: '#0c1370',
  blue900: '#060b4a',

  // Marigold
  marigold50: '#fff4cc',
  marigold100: '#ffe999',
  marigold200: '#ffdd66',
  marigold300: '#ffd233',
  marigold400: '#3C4D6C',
  marigold500: '#ffc700',
  marigold600: '#cc9f00',
  marigold700: '#997700',
  marigold800: '#665000',
  marigold900: '#332800',

  // Turquoise
  turquoise50: '#dcf2f1',
  turquoise100: '#a8dfda',
  turquoise200: '#6bcac2',
  turquoise300: '#06b5a9',
  turquoise400: '#00a597',
  turquoise500: '#009483',
  turquoise600: '#008776',
  turquoise700: '#007766',
  turquoise800: '#006757',
  turquoise900: '#004b3a',

  // Sweet chilli
  sweetChilli50: '#ffeae9',
  sweetChilli100: '#ffada5',
  sweetChilli200: '#ffd6d2',
  sweetChilli300: '#ff8378',
  sweetChilli400: '#ff5a4b',
  sweetChilli500: '#ff311e',
  sweetChilli600: '#cc2718',
  sweetChilli700: '#991d12',
  sweetChilli800: '#66140c',
  sweetChilli900: '#330a06',

  // Pesto
  pesto50: '#e7f6e6',
  pesto100: '#cfeccc',
  pesto200: '#a0d999',
  pesto300: '#70c666',
  pesto400: '#41b333',
  pesto500: '#11a000',
  pesto600: '#0e8000',
  pesto700: '#0a6000',
  pesto800: '#074000',
  pesto900: '#032000',

  white: '#fff',
  black: '#000',
  error: '#e73b26',
  whiteHover: '#e6e6e6',
  overlayBlack: 'rgba(0, 0, 0, 0.3)',
  pageBackgroundColour: '#fbfcfc',
  propertyCardAgencyBoxThreshold: '#eaebed',

  activePurpleDark: '#585dcc',
  activePurpleMed: '#afb5ec',
  activePurpleLight: '#e7eafc',

  purpleHeart: '#4e2db0',
  lightGreen: '#1ab662',
  lightBlue: '#0091b8',
  lightGrey: '#eff2f5',

  valiantColor: '#0ea800',

  nevada: '#6b747a',
};

export const fonts = {
  fontFamily: `'AvenirNextLTPro', sans-serif`,
  light: 300,
  regular: 'normal',
  medium: 500,
  semiBold: 600,
  bold: 700,
  boldX: 800,
  heavy: 900,
};

export const layout = {
  pageWidth: 1140,
  searchFiltersSidebarWidth: 348,
  searchFiltersSidebarWidthTablet: 278,
  searchFilterHorizontalMargin: 18,
  searchCardWidth: 1042,
  pageHorizontalMargin: {
    tablet: 21,
    mobile: 18,
    desktop: 15,
  },
  cardTileHorizontalMargin: {
    mobile: 9,
    tablet: 21,
  },
  footerAlignPadding: 15,
  businessSearchCardWidth: 1024,
  propertyCardMaxWidth: 750,
};

export const globalBoxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.2)';
export const globalBoxShadowHover = '0 3px 6px 0 rgba(30, 41, 61, 0.15), 0 5px 10px 0 rgba(30, 41, 61, 0.15)';
export const buttonBoxShadow = `0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)`;

export const globalMargins = {
  xxxs: `${rem(6)}`, // 6px
  xxs: `${rem(9)}`, // 9px
  xs: `${rem(12)}`, // 12px
  sm: `${rem(18)}`, // 18px
  md: `${rem(24)}`, // 24px
  lg: `${rem(30)}`, // 30px
  xl: `${rem(48)}`, // 48px
  xxl: `${rem(60)}`, // 60px
};

export const globalSpacing = {
  large: {
    // Desktop
    xxl: spacingUnit * 20,
    xl: spacingUnit * 10,
    l: spacingUnit * 8,
    m: spacingUnit * 6,
    s: spacingUnit * 4,
    xs: spacingUnit * 2,
    xxs: spacingUnit,
  },
  regular: {
    // tablet
    xxl: spacingUnit * 18,
    xl: spacingUnit * 9,
    l: spacingUnit * 7,
    m: spacingUnit * 6,
    s: spacingUnit * 3,
    xs: spacingUnit * 2,
    xxs: spacingUnit,
  },
  compact: {
    // mobile
    xxl: spacingUnit * 16,
    xl: spacingUnit * 8,
    l: spacingUnit * 6,
    m: spacingUnit * 4,
    s: spacingUnit * 3,
    xs: spacingUnit * 2,
    xxs: spacingUnit,
  },
};

// http://png-pixel.com/
export const emptyImages = {
  ratio4by3:
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=', // 4:3
  ratio16by9:
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEElEQVR42mNkIAAYRxWAAQAG9gAKqv6+AwAAAABJRU5ErkJggg==', // 16:9
  ratio21by9:
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAJCAQAAAB3Cq/9AAAAEUlEQVR42mNkIBowjiqliVIACRIACvsH5W4AAAAASUVORK5CYII=', // 21:9
};

export const imagePlaceholderBackground = `${colors.neutral200}
  url('https://cre.domainstatic.com.au/images/common/img-placeholder.svg') center/96px no-repeat`;

export const cardWidth = {
  xs: 284,
  lg: 321,
};
