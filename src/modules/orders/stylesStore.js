import { StyleSheet } from 'react-native';
import { getWidthAndHeight } from '@utils/dimensions';
import fontSizes from '@constants/fontSizes';
import Colors from '@constants/color';

const { width } = getWidthAndHeight();
const sidePadding = width * 0.02;
const styles = StyleSheet.create({
  containerOrder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerRows: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(146,238,238,0.5)',
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  containerItem: {
    backgroundColor: 'rgba(255,255,255,1)',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: sidePadding,
    shadowColor: '#e2e2e2',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 5,
    borderRadius: 5,
    flex: 1
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  blockRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  orderNoStyle: {
    width: '50%',
    padding: 7,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    left: 15,
  },
  textRow: {
    fontSize: fontSizes.regular,
    color: Colors.white
  },
  containerDetailOrder: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  textOrderStyle: {
    paddingVertical: 3,
    color: '#242729',
    fontSize: fontSizes.regular,
  },
  textName: {
    paddingVertical: 3,
    fontSize: fontSizes.largeRegular,
    fontStyle: 'italic',
    color: '#f06363'
  },
  textAddress: {
    fontSize: fontSizes.regular,
  },
  containerCalendar: {
    flexDirection: 'column',
    width: '30%',
    paddingBottom: 10,
    justifyContent: 'flex-start'
  },
  viewCalendar: {
    paddingVertical: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewDetailCalendar: {
    backgroundColor: 'rgba(146,238,238,0.7)',
    paddingVertical: 20,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  textDelivery: {
    fontSize: 16,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  textTime: {
    paddingHorizontal: 15,
    alignSelf: 'center'
  },
  btnStylePrinted: {
    paddingHorizontal: 14,
    margin: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  iconSwipeLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    margin: 15,
    backgroundColor: '#109e1d'
  }
});
export default styles;
