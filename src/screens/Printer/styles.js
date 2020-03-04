import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';

const { width } = getWidthAndHeight();
const sidePadding = width * 0.05;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: sidePadding,
  },
  containerList: {
    backgroundColor: Colors.transparent,
    flex: 1
  }
});
export default styles;
