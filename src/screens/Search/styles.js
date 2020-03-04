import { StyleSheet } from 'react-native';
import { getWidthAndHeight } from '@utils/dimensions';
import fontSizes from '@constants/fontSizes';
import Colors from '../../constants/color';

const { width, height } = getWidthAndHeight();
const sidePadding = width * 0.02;
const styles = StyleSheet.create({
  containerOrder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textRow: {
    fontSize: fontSizes.regular,
    color: Colors.white
  },
  inputStyle: {
    color: Colors.mainAppColorDark,
    fontSize: fontSizes.smallRegular,
  },
  containerDraft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: sidePadding,
  },
  containerRows: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    shadowColor: '#e2e2e2',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
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
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderNo: {
    marginLeft: 20,
    width: 120,
    height: 30,
    backgroundColor: '#FDA428',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  dateContainer: {
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  createDate: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateIcon: {
    color: '#757575',
    width: 25
  },
  dateText: {
    color: '#757575',
    fontSize: 14
  },
  contentItem: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 5
  },
  titleName: {
    color: '#757575',
    fontSize: 16,
    fontWeight: 'bold'
  },
  noteContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  noteText: {
    color: '#757575',
    fontSize: 14,
    marginLeft: 0,
    marginRight: 25
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 2
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 85,
    margin: 2,
    borderRadius: 5
  },
  buttonText: {
    color: 'white'
  },
  editButton: {
    alignSelf: 'center',
    color: Colors.mainAppColor,
    textAlign: 'right',
    flex: 1
  },
  inputCtnSearch: {
    backgroundColor: '#F1F5F6',
  },
  inputSearch: {
    fontSize: fontSizes.regular,
    color: Colors.mainAppColor
  },
  leftIcon: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.mainAppColor,
    width: 50,
  },
  leftIconRed: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.secondAppColor
  },
  subTextRow: {
    paddingTop: 5,
    fontStyle: 'italic',
    fontSize: 16,
    color: Colors.secondAppColor
  },
  noteDraft: {
    paddingTop: 5,
    fontStyle: 'italic',
    fontSize: 12,
    color: 'white'
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
  blockConfirm: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: sidePadding
  },
  orderNoStyle: {
    width: '35%',
    padding: 7,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    left: 15,
  },
  orderStatusStyle: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderBottomStartRadius: 10
  },
  iconOrderStyles: {
    color: Colors.holderDarkColor,
  },
  textOrderStyle: {
    paddingVertical: 3,
    color: Colors.holderDarkColor,
    fontSize: fontSizes.regular,
  },
  textOrderNote: {
    paddingVertical: 3,
    color: Colors.secondAppColor,
    fontSize: fontSizes.regular,
  },
  textDetailOrder: {
    fontSize: fontSizes.smallRegular,
    fontStyle: 'italic',
    color: Colors.mainAppColor,
    textDecorationLine: 'underline'
  },
  containerDetailOrder: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  dividerStyle: {
    alignSelf: 'center',
    marginHorizontal: 5,
    flex: 1,
    backgroundColor: Colors.mainAppColorDark
  },
  containerHeaderOrder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1
  },
  textDateTime: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    color: Colors.holderDarkColor,
    fontSize: fontSizes.smallRegular,
  },
  textTitleStyle: {
    color: Colors.mainAppColor,
    fontSize: fontSizes.regular,
  },
  containerNotes: {
    justifyContent: 'space-between',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row'
  },
  titleNotes: {
    paddingLeft: 10,
    textAlign: 'right',
    alignSelf: 'center',
    fontSize: fontSizes.largeRegular,
    color: Colors.white
  },
  containerModal: {
    backgroundColor: '#fff',
    width: width * 0.8,
    height: height * 0.7,
    alignSelf: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 5,
    borderRadius: 5,
    shadowColor: '#fff'
  },
  noteWriteContainer: {
    paddingHorizontal: sidePadding,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerInputNote: {
    borderWidth: 1,
    borderColor: '#D2DDE0',
    borderRadius: 5,
    height: height / 10,
    marginVertical: sidePadding
  },
  containerInputStyles: {
    borderBottomWidth: 0,
  },
  containerHeader: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: sidePadding,
  },
});
export default styles;
