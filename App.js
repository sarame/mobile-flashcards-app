import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Constants from 'expo-constants';
import FlashCardsTabs from './navigation/AppNavigator';
import { green, darkBlue } from './utils/colors';
import { setLocalNotification } from './utils/helpers';

const store = createStore( reducer, applyMiddleware(thunk, logger));

function FlashCardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
          <FlashCardStatusBar
            backgroundColor={darkBlue}
            barStyle="light-content"
          />
          <FlashCardsTabs/>
      </Provider>
    );
  }
}
