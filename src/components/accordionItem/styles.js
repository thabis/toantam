import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
// import { getWidthAndHeight } from '@utils/dimensions';
import fontSizes from '@constants/fontSizes';

// const { width } = getWidthAndHeight();

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  headerText: {
    color: Colors.mainAppColor,
    fontSize: fontSizes.regular
  },
  containerStyle: {
    padding: 15,
  },
  sectionContainerStyle: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(141,230,230,0.7)',
  }
});

export default styles;
