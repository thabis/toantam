import { StyleSheet } from 'react-native';
import Colors from '@constants/color';

const styles = StyleSheet.create({
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
    paddingTop: 40,
    alignItems: 'center'
  },
  overlayContainer: {
    backgroundColor: '#fff'
  },
  titleStyles: {
    color: '#16BCC0'
  },
  bottomLabelContainer: {
    marginTop: 15,
    padding: 8,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  labelContainer: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16
  }
});
export default styles;
