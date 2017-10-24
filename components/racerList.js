import { secondaryColor } from '../constants';
import { getSectionsWithData, renderSectionHeader } from '../racerHelpers';
import { load } from '../fetchHelper';
import React from 'react';
import { SectionList, View } from 'react-native';
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
    const { refreshing, racers } = this.state;

    return (
      <View>
        <SectionList
          keyExtractor={({ id }) => id}
          ListEmptyComponent={<ListItem title="Ucitavam natjecatelje" hideChevron={true} />}
          refreshing={refreshing}
          onRefresh={this.loadRacers}
          sections={getSectionsWithData(racers)}
          renderSectionHeader={renderSectionHeader}
          renderItem={this.renderItem}
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
