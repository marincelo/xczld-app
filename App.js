// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { Header, Text, Icon } from 'react-native-elements';

import store from './redux/store';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/homeScreen';
import RaceDetails from './components/raceDetails';

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
          name="person"
          type="ionicons"
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

const Navigator = StackNavigator({
  Home: { screen: HomeScreen, navigationOptions },
  Login: { screen: LoginScreen, navigationOptions },
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
