import { StyleSheet } from 'react-native';
import { getWidthAndHeight } from '@utils/dimensions';

const { width, height } = getWidthAndHeight();
const styles = StyleSheet.create({
  halfViewTop: {
    flex: 1,
    justifyContent: 'center',
  },
  animateSplash: {
    width: width / 2,
    height: height / 4
  },
  imageLogo: {
    top: -50,
    height: height / 6,
    justifyContent: 'center',
    width
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width
  },
});
export default styles;
