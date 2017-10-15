import { load } from '../fetchHelper';
import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class RaceList extends React.PureComponent {
  state = {
    races: [],
    refreshing: false
  }

  componentDidMount() {
      this.loadRaces();
  }

  loadRaces = load('races').bind(this);

  renderItem = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      subtitle={new Date(item.date).toLocaleString()}
      rightTitle={item.ended_at ? 'Zavrsena' : 'Nadolazeca'}
      avatar={{ uri: item.picture_url }}
      roundAvatar
      onPress={() =>
        this.props.navigation.navigate('Race', { raceId: item.id })}
    />
  );

  render() {
    const { races, refreshing } = this.state;

    return (
      <View>
        <FlatList
          keyExtractor={({ id }) => id}
          renderItem={this.renderItem}
          data={races}
          ListEmptyComponent={<ListItem title="Ucitavam utrke" hideChevron={true}/>}
          onRefresh={this.loadRaces}
          refreshing={refreshing}
        />
      </View>
    );
  }
}
