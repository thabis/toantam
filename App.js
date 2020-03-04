/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { registerScreens, startRoot } from '@navigation/navigation';

console.disableYellowBox = true;
class App {
  startApp() {
    registerScreens({ store, Provider });
    startRoot();
  }
}
export default App;
