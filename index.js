import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer'

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

AppRegistry.registerComponent(appName, () => App);
