import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';
import fontSizes from '@constants/fontSizes';

const { width } = getWidthAndHeight();
const marginPadding = width * 0.05;
const sidePadding = width * 0.02;
const blockCtn = width * 0.1;
const styles = StyleSheet.create({
  halfViewEnd: {
    flex: 1,
    justifyContent: 'flex-start',
    width,
  },
  container: {
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  halfViewStart: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: sidePadding * 3 / 2,
    paddingBottom: sidePadding * 3 / 2
  },
  iconInput: {
    color: Colors.mainAppColorDark,
    paddingRight: sidePadding
  },
  blockBasicInfo: {
    paddingBottom: blockCtn
  },
  blockAddressInfo: {
    paddingBottom: blockCtn,
  },
  blockDistrict: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width
  },
  blockRowAddress: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  checkBoxStyles: {
    padding: 20,
    width: width / 2,
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  dividerHeight: {
    backgroundColor: '#e3e3e3',
    height: 1
  },
  divider: {
    backgroundColor: '#e3e3e3',
  },
  blockSwitch: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    paddingTop: blockCtn,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    paddingBottom: 10,
    fontSize: fontSizes.largeRegular,
    color: Colors.secondAppColor,
  },
  textSwitch: {
    fontSize: fontSizes.regular,
    color: '#a6a6a6'
  },
  containerInput: {
    paddingTop: sidePadding,
    paddingBottom: sidePadding,
  },
  taxCode: {
    fontSize: fontSizes.regular,
    color: Colors.mainAppColorDark,
    paddingRight: sidePadding,
    alignSelf: 'center',
  },
  containerInputStyles: {
    borderBottomWidth: 0,
  },
  inputPicker: {
    color: Colors.mainAppColor
  },
  viewPickerContainer: {
    paddingVertical: sidePadding + 10,
    paddingHorizontal: 10,
    width: width / 2,
    color: Colors.mainAppColor,
    paddingLeft: sidePadding + 3,
  },
  inputStyleDisable: {
    color: Colors.mainAppColorDark,
    fontSize: fontSizes.smallRegular,
    backgroundColor: '#f1f1f1',
    paddingLeft: 10,
  },
  inputStyle: {
    color: Colors.mainAppColorDark,
    fontSize: fontSizes.regular,
  },
  inputStyleCompany: {
    color: Colors.mainAppColorDark,
    textDecorationLine: 'underline',
    lineHeight: 25
  },
  btnStyle: {
    backgroundColor: Colors.buttonColor,
    borderColor: Colors.white,
    borderWidth: 0,
    margin: marginPadding,
    marginTop: 10
  },
  btnCompany: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start'
  },
  btnContainerStyle: {
    padding: marginPadding - 10,
  },
  titleStyle: {
    color: Colors.white
  },
  errorStyle: {
    color: '#ff2b2b',
    fontSize: fontSizes.smallRegular
  },
  errorStyleAddress: {
    marginLeft: 15,
    color: '#ff2b2b',
    fontSize: fontSizes.smallRegular
  },
  address: {
    width: width / 2
  },
  dateStyles: {
    paddingTop: 15,
    color: Colors.secondAppColor,
    fontSize: fontSizes.large
  },
  containerRows: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: sidePadding,
    paddingRight: sidePadding
  },
  containerItem: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 2
  },
  editButton: {
    color: Colors.grey
  },
  shadowCheckbox: {
    shadowColor: '#e2e2e2',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  inputCtnSearch: {
    backgroundColor: '#F1F5F6',
  },
  inputSearch: {
    fontSize: fontSizes.regular,
    color: Colors.mainAppColor
  }
});
export default styles;
