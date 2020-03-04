import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';

const { width } = getWidthAndHeight();
const sidePadding = width * 0.05;

const styles = StyleSheet.create({
  halfViewTop: {
    flex: 1,
    justifyContent: 'center',
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
  }
});
export default styles;
