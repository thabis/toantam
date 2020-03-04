import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';
import fontSizes from '@constants/fontSizes';

const { width, height } = getWidthAndHeight();
const sidePadding = width * 0.05;

const styles = StyleSheet.create({
  halfViewTop: {
    flex: 1,
    justifyContent: 'center',
  },
  imageLogo: {
    top: -20,
    height: height / 6,
    margin: sidePadding
  },
  container: {
    flexGrow: 1,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerHeader: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: sidePadding,
  },
  blockRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  textRow: {
    fontSize: 18,
    color: '#83fbf4',
    paddingVertical: 8
  },

  titleSection: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: fontSizes.large,
    color: Colors.mainAppColorDark,
    textAlign: 'left'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containRow: {
    flex: 1,
    flexWrap: 'nowrap',
  },
  text: {
    fontSize: fontSizes.regular,
    color: Colors.grey,
    flexWrap: 'nowrap',
    flex: 1,
  },
  progressStyle: {
    paddingTop: 20,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  basicInfoStyle: {
    flexWrap: 'nowrap',
    flex: 1,
    alignSelf: 'center',
  },
  rowContent: {
    flex: 0.8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: sidePadding,
    backgroundColor: '#1a2b3b',
  },
  oval: {
    zIndex: -1,
    flex: 0.5,
    width: width * 0.50,
    top: -120,
    alignSelf: 'center',
    borderRadius: 40,
    backgroundColor: '#1a2b3b',
    transform: [
      { scaleX: 2 }
    ]
  },
  bottomContainer: {
    flex: 0.8,
  },
  scrollStyle: {
    backgroundColor: '#fff',
    width: '85%',
    height: height * 0.57,
    alignSelf: 'center',
    position: 'absolute',
    top: '43%',
    borderRadius: 10,
    zIndex: 3
  },
  containerModal: {
    backgroundColor: '#fff',
    width: width * 0.8,
    height: width * 0.5,
    alignSelf: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 5,
    borderRadius: 5,
    shadowColor: '#fff'
  },
  containerHeaderModal: {
    justifyContent: 'space-between',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row'
  },
  titleHeaderModal: {
    paddingLeft: 10,
    textAlign: 'right',
    alignSelf: 'center',
    fontSize: fontSizes.largeRegular,
    color: Colors.white
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: sidePadding,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerInputSearch: {
    marginVertical: 5
  },
  containerNote: {
    borderWidth: 1,
    borderColor: '#D2DDE0',
    borderRadius: 5,
    height: height / 10,
  },
  containerInputStyles: {
    borderBottomWidth: 0
  }
});
export default styles;
