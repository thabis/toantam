import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';

const { width, height } = getWidthAndHeight();
const sidePadding = width * 0.05;

const styles = StyleSheet.create({
  halfViewTop: {
    flex: 1,
    justifyContent: 'center',
  },
  imageLogo: {
    top: -20,
    height: height / 6,
    margin: sidePadding
  },
  container: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerHeader: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: sidePadding,
    height: width * 0.23,
  }
});
export default styles;
