import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

export default class RaceList extends PureComponent {
  state = {
    races: [],
    refreshing: false
  }

  componentDidMount() {
      this.loadRaces();
  }

  loadRaces = () => {
      this.setState({refreshing: true});

      fetch('http://xczld.herokuapp.com/races.json')
      .then(response => response.json())
      .then(json => {
          this.setState({races: json, refreshing: false});
      })
      .catch(error => console.log(error));
  }

  renderItem = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      subtitle={new Date(item.date).toLocaleString()}
      rightTitle={item.ended_at ? 'Zavrsena' : 'Nadolazeca'}
      onPress={() =>
        this.props.navigation.navigate('Race', { raceId: item.id })}
    />
  );

  render() {
    const { races, refreshing } = this.state;

    return (
      <View>
        <List {...{ style }}>
          <FlatList
            keyExtractor={({ id }) => id}
            renderItem={this.renderItem}
            data={races}
            ListEmptyComponent={<ListItem title="Ucitavam utrke" hideChevron={true}/>}
            onRefresh={this.loadRaces}
            refreshing={refreshing}
          />
        </List>
      </View>
    );
  }
}

const style = {
  height: '100%'
};
