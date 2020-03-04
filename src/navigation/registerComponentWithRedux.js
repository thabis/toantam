import { Navigation } from 'react-native-navigation';

const registerComponentWithRedux = redux => (
  name,
  component,
) => {
  Navigation.registerComponentWithRedux(
    name,
    () => component,
    redux.Provider,
    redux.store,
  );
};

export default registerComponentWithRedux;
