// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { Header, Text } from 'react-native-elements';

import store from './redux/store';
import RaceList from './components/raceList';
import RaceDetails from './components/raceDetails';

const navigationOptions = {
  header: () => (
    <Header
      centerComponent={
        <Text h2 style={{ color: '#fff' }}>
          {' '}
          XCZLD{' '}
        </Text>
      }
      backgroundColor="#009688"
    />
  )
};

const Navigator = StackNavigator({
  Home: { screen: RaceList, navigationOptions },
  Race: { screen: RaceDetails, navigationOptions }
});

export default (render = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
});
