// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Header, Text } from 'react-native-elements';

import store from './redux/store';
import ClubList from './components/clubList';
import RaceList from './components/raceList';
import RaceDetails from './components/raceDetails';

const navigationOptions = {
  header: () => (
    <Header
      centerComponent={
        <Text h2 style={{ color: '#fff' }}>
          XCZLD
        </Text>
      }
      backgroundColor="#009688"
    />
  )
};

const HomeScreen = TabNavigator({
  Utrke: {
    screen: RaceList,
  },
  Klubovi: {
    screen: ClubList,
  }
},
{
  tabBarPosition: 'top',
  lazy: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#555',
    style: {
      backgroundColor: '#009688',
      height: 40,
      marginTop: 65
    },
    labelStyle: {
      color: '#fff'
    },
    indicatorStyle: {
      backgroundColor: '#ff5252'
    }
  }
});

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
