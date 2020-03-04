import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
// import fontSizes from '@constants/fontSizes';
// import { getWidthAndHeight } from '@utils/dimensions';

// const { width } = getWidthAndHeight();
const styles = StyleSheet.create({
  overlayContainerStyle: {
    backgroundColor: Colors.white,
  },
  badgeIconStyle: {
    position: 'absolute',
    top: -5,
    right: 0
  }
});
export default styles;
