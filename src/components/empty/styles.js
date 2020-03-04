import { StyleSheet } from 'react-native';
import { getWidthAndHeight } from '@utils/dimensions';
import Colors from '@constants/color';
import fontSizes from '@constants/fontSizes';

const { width, height } = getWidthAndHeight();
const topPadding = width * 0.3;
const styles = StyleSheet.create({
  emptyStyles: {
    paddingTop: topPadding,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  images: {
    width: width / 4,
    height: height / 4,
  },
  title: {
    paddingTop: 5,
    color: Colors.secondAppColor,
    fontSize: fontSizes.regular,
  },
});
export default styles;
