import { StyleSheet } from 'react-native';
import { getWidthAndHeight } from '@utils/dimensions';
import fontSizes from '@constants/fontSizes';
// import Colors from '@constants/color';

const { width } = getWidthAndHeight();
const sidePadding = width * 0.02;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: sidePadding,
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  rowWrap: {
    flexDirection: 'row',
    padding: sidePadding,
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  blockColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: sidePadding
  },
  textRow: {
    color: '#242729',
    fontSize: fontSizes.largeRegular
  },
  iconOrderStyles: {
    color: '#242729'
  },
  headerContainer: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleHeader: {
    fontSize: 18,
    color: '#f06363',
    fontWeight: '500'
  },
  iconHeader: {
    paddingRight: 10,
    color: '#f06363'
  }
});
export default styles;
