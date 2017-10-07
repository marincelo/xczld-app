// @flow
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Header, Text, Icon } from 'react-native-elements';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/homeScreen';
import RaceDetails from './components/raceDetails';
import RacerDetails from './components/racerDetails';

const navigationOptions = ({navigation}) => {
  const header = (
    <Header
      centerComponent={
        <Text h2 style={{ color: '#fff' }}>
          XCZLD
        </Text>
      }
      rightComponent={
        <Icon
          name="fingerprint"
          color="#fff"
          onPress={ () => navigation.navigate('Login') }
        />
      }
      backgroundColor="#009688"
    />
  );

  return {
    header
  };
};


const App = StackNavigator({
  Home: { screen: HomeScreen, navigationOptions },
  Login: { screen: LoginScreen, navigationOptions },
  Race: { screen: RaceDetails, navigationOptions },
  Racer: { screen: RacerDetails, navigationOptions }
});

export default App;
