import {Dimensions, PixelRatio} from 'react-native';
import {COLORS_PALLETE} from './colors';

const {width, height} = Dimensions.get('window');

const BUTTON_COLOR = {
  LOGIN_BUTTON: '#F15A40',
  LOGOUT_BUTTON: '#F15A40',
  APPROVE_BUTTON: '#43A047',
  REJECT_BUTTON: '#DE3E3A',
  CANCEL_BUTTON: '#787A7A',
};

const COLORS = {
  WHITE: COLORS_PALLETE.WHITE,
  BLACK: COLORS_PALLETE.BLACK,
  DARK_BLUE: COLORS_PALLETE.DARK_BLUE,
  LIGHT_BLUE: COLORS_PALLETE.LIGHT_BLUE,
  LIGHT_ORANGE: COLORS_PALLETE.LIGHT_ORANGE,
  DARK_ORANGE: COLORS_PALLETE.DARK_ORANGE,
  YELLOW: COLORS_PALLETE.YELLOW,
  DARK_RED: COLORS_PALLETE.DARK_RED,
  LIGHT_RED: COLORS_PALLETE.LIGHT_RED,
  DARK_GREY: COLORS_PALLETE.DARK_GREY,
  LIGHT_GREY: COLORS_PALLETE.LIGHT_GREY,
  LIGHT_SKY: COLORS_PALLETE.WHITE,
  GREEN: COLORS_PALLETE.GREEN,
  COOL_BLUE: COLORS_PALLETE.COOL_BLUE,
};

const FONT_FAMILY = {
  REGULAR: 'AnekDevanagari-Regular',
  BOLD: 'AnekDevanagari-Bold',
  THIN: 'AnekDevanagari-Thin',
  LIGHT: 'AnekDevanagari-Light',
  MEDIUM: 'AnekDevanagari-Medium',
  SEMI_MEDIUM: 'AnekDevanagari-SemiBold',
  EXTRA_LIGHT: 'AnekDevanagari-ExtraLight',
  EXTRA_BOLD: 'AnekDevanagari-ExtraBold',
};

const FONT_SIZE = {
  TWO: 2,
  FOUR: 4,
  EIGHT: 8,
  TEN: 10,
  TWELVE: 12,
  FOURTEEN: 14,
  SIXTEEN: 16,
  EIGHTEEN: 18,
  TWENTY: 20,
  TWENTY_FIVE: 25,
  THIRTY: 30,
};

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const memorizeDimensions = () => {
  const cacheHeight = {};
  const cacheWidth = {};
  // const setHeight = (h) => {
  //   if (!cacheHeight[h]) {
  //     cacheHeight[h] = (height / 100) * h;
  //   }
  //   return cacheHeight[h];
  // };
  // const setWidth = (w) => {
  //   if (!cacheWidth[w]) {
  //     cacheWidth[w] = (width / 100) * w;
  //   }
  //   return cacheWidth[w];
  // };
  const setWidth = w => {
    // Parse string percentage input and convert it to number.
    if (!cacheWidth[w]) {
      const elemWidth = typeof w === 'number' ? w : parseFloat(w);
      cacheWidth[w] = PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
    }
    return cacheWidth[w];
  };

  const setHeight = h => {
    // Parse string percentage input and convert it to number.
    if (!cacheHeight[h]) {
      const elemHeight = typeof h === 'number' ? h : parseFloat(h);
      // Use PixelRatio.roundToNearestPixel method in order to round the layout
      // size (dp) to the nearest one that correspons to an integer number of pixels.
      cacheHeight[h] = PixelRatio.roundToNearestPixel(
        (height * elemHeight) / 100,
      );
    }
    return cacheHeight[h];
  };

  return {
    setWidth,
    setHeight,
  };
};

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const appStyle = {
  container: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  // global list Item style
  item: {
    backgroundColor: COLORS.LIGHT_BLUE,
    borderWidth: 1,
    borderColor: COLORS.DARK_ORANGE,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    // justifyContent: 'space-between',
    fontWeight: 'bold',
    borderRadius: 10,
    flexDirection: 'column',
    // alignItems: 'center',
    minHeight: 58,
    opacity: 1,
    shadowColor: COLORS.LIGHT_BLUE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 6,
    shadowRadius: 4.22,
    elevation: 3,
  },
  renderListStyle: {
    borderWidth: 1,
    paddingLeft: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    fontWeight: 'bold',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#FFFFFF',
    height: 50,
    opacity: 1,

    shadowColor: COLORS.LIGHT_ORANGE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.22,
    elevation: 4,
  },
  listLabel: {
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  listBody: {
    fontSize: 14,
    color: COLORS.COOL_BLUE,
    padding: 5,
    fontFamily: FONT_FAMILY.REGULAR,
  },

  itemLeft: {
    // width: '50%',
    textAlign: 'left',
  },
  itemRight: {
    // width: '50%',
    textAlign: 'right',
  },

  highLightedWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: 6,
    borderWidth: 1,
  },

  highLightedView: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftBorder: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  rightBorder: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
};

export {
  scale,
  verticalScale,
  moderateScale,
  memorizeDimensions,
  height,
  width,
  FONT_FAMILY,
  FONT_SIZE,
  COLORS,
  COLORS_PALLETE,
  BUTTON_COLOR,
  TEXT_COLOR,
  appStyle,
};
