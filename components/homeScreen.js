import { primaryColor, secondaryColor } from '../constants';
import { TabNavigator } from 'react-navigation';

import ClubList from './clubList';
import RaceList from './raceList';
import RacerList from './racerList';

const HomeScreen = TabNavigator({
  Utrke: {
    screen: RaceList,
  },
  Natjecatelji: {
    screen: RacerList,
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
      backgroundColor: primaryColor,
      height: 40,
      marginTop: 65
    },
    labelStyle: {
      color: '#fff'
    },
    indicatorStyle: {
      backgroundColor: secondaryColor
    }
  }
});

export default HomeScreen;
