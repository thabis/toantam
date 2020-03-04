import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';
import fontSizes from '@src/constants/fontSizes';

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
  },
  containerHeader2: {
    backgroundColor: '#1B2136',
    borderWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  iconLeft: {
    color: Colors.mainAppColor
  },
  label: {
    color: Colors.mainAppColor
  },
  background: {
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: sidePadding
  },
  overlayContainer: {
    backgroundColor: '#fff'
  },
  titleStyles: {
    color: '#16BCC0',
    fontSize: fontSizes.larger
  },
  bottomLabelContainer: {
    margin: 8,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 10
  },
  labelContainer: {
    textAlign: 'left',
    color: '#ffffff',
    fontSize: 16
  }
});
export default styles;
