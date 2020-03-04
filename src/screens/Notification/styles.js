import { StyleSheet } from 'react-native';
import Colors from '@constants/color';
import { getWidthAndHeight } from '@utils/dimensions';

const { width } = getWidthAndHeight();
const sidePadding = width * 0.05;

const styles = StyleSheet.create({
  containerRow: { flex: 1, flexDirection: 'column', justifyContent: 'flex-start' },
  containerRowValue: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    alignSelf: 'center',
  },
  containerText: {
    paddingLeft: sidePadding,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  containerHeader: {
    backgroundColor: Colors.transparent,
    paddingHorizontal: sidePadding,
  },
  text: {
    color: Colors.textRead
  },
  iconStyle: {
    paddingTop: 5, paddingLeft: 1
  },
  containerAvatar: {
    width: 24, height: 24, borderRadius: 15
  },
  mainText: {
    fontWeight: '500', fontSize: 16, color: '#222'
  },
  content: {
    fontWeight: '400', fontSize: 14,
  },
  timing: {
    paddingTop: 5,
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.disabledGrey
  }
});
export default styles;
