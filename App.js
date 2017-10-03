// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { Header, Text } from 'react-native-elements';

import store from './redux/store';
import HomeScreen from './components/homeScreen';
import RaceDetails from './components/raceDetails';

const header = (
  <Header
    centerComponent={
      <Text h2 style={{ color: '#fff' }}>
        XCZLD
      </Text>
    }
    backgroundColor="#009688"
  />
);

const navigationOptions = {
  header
};

const Navigator = StackNavigator({
  Home: { screen: HomeScreen, navigationOptions },
  Race: { screen: RaceDetails, navigationOptions }
});


const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
