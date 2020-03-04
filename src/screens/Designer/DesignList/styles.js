import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';

const { width } = getWidthAndHeight();
const sidePadding = width * 0.05;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerHeader: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: sidePadding,
  },
  containerMultiHeader: {
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    height: 20
  },
  containerList: {
    backgroundColor: Colors.transparent,
    flex: 1
  },
  containerHeaderTitle: {
    justifyContent: 'center',
    flex: 1
  }
});
export default styles;
