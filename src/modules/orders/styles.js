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
    justifyContent: 'space-between',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderNo: {
    marginLeft: 20,
    width: 120,
    height: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  dateContainer: {
    marginRight: 20,
    marginTop: 5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  createDate: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateIcon: {
    color: 'rgba(0,0,0,0.5)',
    width: 25
  },
  dateText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 16,
    marginHorizontal: 5
  },
  contentItem: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    marginRight: 75
  },
  titleName: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 18,
    fontWeight: 'bold'
  },
  noteContainer: {
    marginHorizontal: 0,
    marginVertical: 5,
    marginRight: 65,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  noteText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 16,
    marginLeft: 0,
    marginRight: 25
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flex: 1
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  editButton: {
    alignSelf: 'center',
    color: Colors.mainAppColor,
    textAlign: 'right',
    flex: 1
  },
  inputCtnSearch: {
    backgroundColor: 'transparent',
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
    color: Colors.white
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
    paddingHorizontal: sidePadding,
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
    paddingHorizontal: 15,
    flex: 1
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
  containerCommentModal: {
    backgroundColor: '#fff',
    width: width * 0.8,
    // height: height * 0.7,
    alignSelf: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 5,
    shadowColor: '#fff',
    borderRadius: 15,
    marginTop: -120
  },
  containerKeyBoard: {
    paddingTop: height / 8
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
  itemContainerStyle: {
    backgroundColor: 'rgba(146,238,238,0.5)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    marginTop: 0
  },
  containerHeader: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: sidePadding,
  },
  itemDividerStyle: {
    marginVertical: 5,
    marginBottom: 5,
    backgroundColor: 'white'
  },
  itemDiscussDate: {
    color: 'rgba(10,10,10,0.5)'
  },
  itemContainerDate: {
    margin: 10,
    height: 70,
    width: 65,
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0
  },
  itemContainerDateHeader: {
    paddingVertical: 5,
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  itemCreateDateTitle: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  itemContainerDateContent: {
    paddingVertical: 0,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  itemCreateDateText: {
    paddingVertical: 2,
    color: '#6F6E6F',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemDateNotFollowText: {
    paddingVertical: 0,
    color: '#6F6E6F',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemDateNotFollowTitle: {
    paddingVertical: 2,
    color: 'rgba(10,10,10,0.5)',
    fontSize: 14,
    textAlign: 'center',
  },
  itemSwiperContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#109e1d',
    borderRadius: 5
  },
  contentItemFooter: {
    marginHorizontal: 20,
    marginBottom: 5
  },
  containerDetailHeader: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: sidePadding,
  },
  containerHeaderOrderDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerFooterDetail: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  actionMesageText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  containerSearchStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    shadowColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  }
});
export default styles;
