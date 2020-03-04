import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';

const { width } = getWidthAndHeight();
const marginPadding = width * 0.05;
const sidePadding = width * 0.02;
const styles = StyleSheet.create({
  halfViewEnd: {
    flex: 1,
    justifyContent: 'flex-start',
    width,
  },
  iconInput: {
    color: Colors.white
  },
  containerInput: {
    padding: sidePadding,
  },
  containerInputStyles: {
    marginLeft: marginPadding,
    marginRight: marginPadding,
    paddingTop: sidePadding,
    paddingBottom: sidePadding,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  inputStyle: {
    paddingLeft: 10,
    color: Colors.white
  },
  btnStyle: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.white,
    borderWidth: 1,
    margin: marginPadding,
    marginTop: 10
  },
  btnContainerStyle: {
    padding: marginPadding - 10,
  },
  titleStyle: {
    color: Colors.white
  },
  errorStyle: {
    marginLeft: marginPadding,
    marginRight: marginPadding,
    color: '#ff2b2b',
  },
  containerRegister: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: marginPadding,
    marginRight: marginPadding,
  },
  lineStyles: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: width / 3
  }
});
export default styles;
