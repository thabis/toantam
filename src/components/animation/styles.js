import { StyleSheet } from 'react-native';
// import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';
// import fontSizes from '@constants/fontSizes';

const { width } = getWidthAndHeight();
const sidePadding = width * 0.02;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  containerItem: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: sidePadding,
    // shadowColor: '#e2e2e2',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 1,
    // shadowRadius: 1,
    borderRadius: 5,
    flex: 1
  },
});

export default styles;
