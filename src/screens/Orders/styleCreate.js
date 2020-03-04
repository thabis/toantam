import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import fontSizes from '@constants/fontSizes';
import { getWidthAndHeight } from '@utils/dimensions';

const { width, height } = getWidthAndHeight();
const sidePadding = width * 0.05;
const postion = width * 0.03;
const stylesCreate = StyleSheet.create({
  halfViewTop: {
    justifyContent: 'center',
    height: height * 0.75
  },
  viewModalTop: {
    flex: 1,
    justifyContent: 'center',
    height: height * 0.75
  },
  containerHeader: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: sidePadding,
  },
  section: {
    flex: 1,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    paddingTop: 10,
  },
  container: {
    flexGrow: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerButton: {
    flex: 1,
    width,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  btnStyle: {
    borderColor: Colors.mainAppColor,
  },
  archiveTitle: {
    color: Colors.secondAppColor
  },
  btnTitle: {
    color: Colors.mainAppColor,
  },
  btnArchive: {
    borderColor: Colors.secondAppColor,
  },
  titleSection: {
    paddingBottom: 10,
    fontSize: fontSizes.large,
    color: Colors.secondAppColor,
    textAlign: 'center'
  },
  subtitleSection: {
    paddingTop: 10,
    paddingBottom: 10,
    width: 140,
    fontSize: fontSizes.regular,
    color: Colors.mainAppColorDark
  },
  subtitleMethod: {
    width: 140,
    fontSize: fontSizes.regular,
    color: Colors.mainAppColorDark
  },
  subtitlenNotWidthSection: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: fontSizes.regular,
    color: Colors.mainAppColorDark
  },
  secondSubTitle: {
    color: Colors.secondAppColor
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rowInline: {
    paddingTop: 10,
    // paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputPicker: {
    color: Colors.mainAppColor,
    fontSize: fontSizes.regular
  },
  containerPicker: {
    width: width * 0.4,
    color: Colors.mainAppColor,
  },
  customContainerPicker: {
    paddingTop: 10,
    right: 10,
  },
  placeHolderPicker: {
    padding: 0,
  },
  iconPicker: {
    color: Colors.mainAppColor,
  },
  containerRadio: {
    // backgroundColor: 'red',
    borderWidth: 0,
    justifyContent: 'flex-end',
    left: postion,
    width: 80,
    backgroundColor: 'transparent'
  },
  textRadio: {
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'italic'
  },
  inputSize: {
    textAlign: 'right',
    fontSize: fontSizes.regular,
  },
  containerInputSize: {
    borderBottomWidth: 0,
    height: 20
  },
  containerSize: {
    width: width * 0.18,
    padding: 5,
    backgroundColor: Colors.disabledLightGrey,
    alignSelf: 'center',
    alignItems: 'center'
  },
  xText: {
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  containerInputStyles: {
    borderBottomWidth: 0,
  },
  containerInput: {
    paddingHorizontal: 0,
  },
  addressInput: {
    fontSize: fontSizes.regular,
    color: Colors.grey
  },
  totalText: {
    width: '100%',
    textAlign: 'right',
    fontSize: fontSizes.largeRegular,
    color: Colors.secondAppColor
  },
  containerOutsource: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemOutSource: {
    padding: 10,
    backgroundColor: '#D2DDE0',
    marginLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loadingStyle: {
    color: Colors.secondAppColor,
  },
  inputStyleCustomer: {
    flex: 1,
    color: Colors.mainAppColorDark,
    fontSize: fontSizes.regular,
    lineHeight: 25
  },
  btnCustomer: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
  iconCustomer: {
    alignSelf: 'center',
    textAlign: 'right',
    color: Colors.mainAppColor
  },
  inputStyleDisable: {
    color: Colors.mainAppColorDark,
    fontSize: fontSizes.smallRegular,
    backgroundColor: '#f1f1f1',
    paddingLeft: 10,
    marginTop: 10,
  },
  noteContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    width: '100%',
    height: 200,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  noteRow: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5
  },
  noteTime: {
    color: '#333',
    fontSize: 14,
    fontStyle: 'italic'
  },
  noteDescript: {
    color: '#222',
    paddingTop: 5
  },
  noteWriteContainer: {
    flex: 1,
    width,
    paddingHorizontal: sidePadding,
  },
  containerInputNote: {
    borderWidth: 1,
    borderColor: '#D2DDE0',
    borderRadius: 5,
    height: height / 5,
    marginVertical: sidePadding
  },
  styleNote: {
    height: height * 0.18
  }
});
export default stylesCreate;
