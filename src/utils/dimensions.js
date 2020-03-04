import { Dimensions } from 'react-native';

export const getWidth = () => Dimensions.get('window').width;
export const getHeight = () => Dimensions.get('window').height;
export const getWidthAndHeight = () => Dimensions.get('window');
