import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Header, Text, Icon } from 'react-native-elements';

import RaceList from './components/raceList';
import RaceDetails from './components/raceDetails';
import RacerTracker from './components/racerTracker';

const navigationOptions = {
  header: ({ goBack }) => (<Header
    centerComponent={<Text h2 style={{ color: '#fff' }}> XCZLD </Text>}
    backgroundColor="#009688"/>)
}

const App = StackNavigator({
    Home: { screen: RaceList, navigationOptions },
    Race: { screen: RaceDetails, navigationOptions }
  }
);

module.exports = App;
