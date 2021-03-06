import { loadResource } from '../fetchHelper';
import React from 'react';
import { View, FlatList } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

export default class ClubDetails extends React.Component {
  state = {
    club: {}
  };

  componentDidMount() {
    this.loadClub();
  }

  loadClub = loadResource('club', this.props.navigation.state.params.clubId);

  renderItem = ({ item }) => (
    <ListItem
      title={`${item.first_name} ${item.last_name}`}
      rightTitle={`Kategorija ${item.category.toUpperCase()}`}
      onPress={() =>
        this.props.navigation.navigate('Racer', { racerId: item.id })}
    />
  );

  render() {
    const {club} = this.state;

    return (<View style={styles.container}>
      <Text h2 style={styles.header}>
        {club.name}
      </Text>
      <Text h4 style={styles.header}> { club.racers_count } clanova </Text>

      <List>
        <FlatList
          keyExtractor={({ id }) => id}
          renderItem={this.renderItem}
          data={club.racers}
          ListEmptyComponent={<ListItem title="Nema clanova" hideChevron={true} />}
        />
      </List>
    </View>);
  }
}

const styles = {
  container: {
    height: '79%',
    marginTop: 75,
  },
  header: {
    marginLeft: 40
  }
};
