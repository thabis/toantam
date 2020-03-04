import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import fontSizes from '@constants/fontSizes';
import { getWidthAndHeight } from '@utils/dimensions';

const { width } = getWidthAndHeight();
const widthPadding = width * 0.05;
const styles = StyleSheet.create({
  iconLeft: {
    color: Colors.mainAppColor
  },
  container: {
    paddingRight: widthPadding,
    backgroundColor: Colors.mainAppColor,
    justifyContent: 'space-between'
  },
  headerText: {
    color: Colors.white,
    fontSize: fontSizes.regular
  },
  subHeaderText: {
    color: Colors.white,
    fontSize: fontSizes.small,
    paddingTop: 5,
  },
  headerContainer: {
    resizeMode: 'cover',
  }
});
export default styles;
