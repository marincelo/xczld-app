import React from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

export default class RacerList extends React.Component {
  state = {
    racers: [],
    refreshing: false
  }

  componentDidMount() {
    this.loadRacers();
  }

  loadRacers = () => {
    this.setState({refreshing: true});

    fetch('http://xczld.herokuapp.com/racers.json')
    .then(response => response.json())
    .then(json => this.setState({racers: json, refreshing: false}))
    .catch(error => console.log(error));
  }

  renderItem = ({ item }) => (
    <ListItem
      title={`${item.first_name} ${item.last_name}`}
      rightTitle={`${item.start_number.value}`}
      onPress={() =>
        this.props.navigation.navigate('Racer', { racerId: item.id })}
    />
  );

  render() {
    const { racers, refreshing } = this.state;

    return (
      <View>
        <List {...{ style }}>
          <FlatList
            keyExtractor={({ id }) => id}
            renderItem={this.renderItem}
            data={racers}
            ListEmptyComponent={<Text> Ucitavam natjecatelje </Text>}
            onRefresh={this.loadRacers}
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
