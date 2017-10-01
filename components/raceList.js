// @flow
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import connect from '../redux/connect';
import { load } from '../redux/modules/races';
import { getRaces } from '../redux/selectors/races';

@connect({ races: getRaces }, { load })
class RaceList extends React.Component {
  state = {
    refreshing: false
  };

  componentDidMount() {
    this.setState({ refreshing: true });
    this.props.load();
    this.setState({ refreshing: false });
  }

  render() {
    const { races, setRace } = this.props;

    return (
      <List style={style}>
        {races ? (
          <FlatList
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.name}`}
                onPress={() => setRace(item.id)}
              />
            )}
            data={races}
            ListEmptyComponent={<Text> Nema utrka... </Text>}
            refreshing={this.state.refreshing}
          />
        ) : (
          undefined
        )}
      </List>
    );
  }
}

export default RaceList;

const style = {
  height: '80%',
  marginTop: 70
};
