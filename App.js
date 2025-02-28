import React from 'react';
import Redux from './redux-store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Navigation} from './Navigation';
const {store, persistor} = Redux;
import {LogBox} from 'react-native';
import ignoreWarnings from 'ignore-warnings';
import { ToastProvider } from 'react-native-toast-notifications';
import HomeScreen from './Screens/HomeScreen/homeScreen';
import ProfileScreen from './Screens/ProfileScreen/profilescreen';
ignoreWarnings('warn', ['ViewPropTypes']);

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);

function App() {
  
  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
          
          
        </PersistGate>
      </Provider>
    </ToastProvider>
    
  );
}
export default App;
