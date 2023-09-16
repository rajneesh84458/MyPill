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
  REGULAR: 'Poppins-Regular',
  BOLD: 'Poppins-Bold',
  THIN: 'Poppins-Thin',
  LIGHT: 'Poppins-Light',
  MEDIUM: 'Poppins-Medium',
  SEMI_MEDIUM: 'Poppins-SemiBold',
  EXTRA_LIGHT: 'Poppins-ExtraLight',
  EXTRA_BOLD: 'Poppins-ExtraBold',
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
// Function to calculate responsive Width
const setWidth = w => {
  const screenWidth = width;
  return PixelRatio.roundToNearestPixel((w * screenWidth) / 100);
};

// Function to calculate responsive height
const setHeight = h => {
  const screenHeight = height;
  return PixelRatio.roundToNearestPixel((h * screenHeight) / 100);
};

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
  setWidth,
  setHeight,
  FONT_FAMILY,
  FONT_SIZE,
  COLORS,
  COLORS_PALLETE,
  BUTTON_COLOR,
  appStyle,
};
