import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Header, List, ListItem, Text } from 'react-native-elements';
import RaceList from './components/raceList';
import RaceDetails from './components/raceDetails';
import RacerTracker from './components/racerTracker';

export default class App extends React.Component {

  state = {
    raceId: undefined
  }

  render() {
    return (
      <View>
        <View>
          <Header
            centerComponent={{ text: 'XCZLD', style: { color: '#fff' } }}
            backgroundColor="#009688"
          />
          {
            this.state.raceId ?
            undefined
            : <RaceList setRace={raceId => this.setState({raceId})} />
          }
          {
            this.state.raceId ?
            <RaceDetails raceId={this.state.raceId}/>
            : undefined
          }

        </View>
        <RacerTracker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 75,
  }
});
