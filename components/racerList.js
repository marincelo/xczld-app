import { secondaryColor } from '../constants';
import { load } from '../fetchHelper';
import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

export default class RacerList extends React.Component {
  state = {
    racers: [],
    refreshing: false
  }

  componentDidMount() {
    this.loadRacers();
  }

  loadRacers = load('racers').bind(this);

  renderItem = ({ item }) => (
    <ListItem
      leftIcon={<Text style={styles.leftIcon}>{item.start_number.value}</Text>}
      title={`${item.first_name} ${item.last_name}`}
      rightTitle={`${item.total_points} bodova`}
      subtitle={`Kategorija ${item.category.toUpperCase()}`}
      onPress={() =>
        this.props.navigation.navigate('Racer', { racerId: item.id })}
    />
  );

  render() {
    const { racers, refreshing } = this.state;

    return (
      <View>
        <FlatList
          style={styles.list}
          keyExtractor={({ id }) => id}
          renderItem={this.renderItem}
          data={racers}
          ListEmptyComponent={<ListItem title="Ucitavam natjecatelje" hideChevron={true} />}
          onRefresh={this.loadRacers}
          refreshing={refreshing}
        />
      </View>
    );
  }
}

const styles = {
  list: {
    height: '100%'
  },
  leftIcon: {
      fontSize: 16,
      fontWeight: 'bold',
      color: secondaryColor,
      paddingTop: 8,
      paddingRight: 10
  }
};
