import { categories, secondaryColor } from '../constants';
import { compareRacers } from '../racerHelpers';
import { load } from '../fetchHelper';
import React from 'react';
import { SectionList, FlatList, View } from 'react-native';
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

  getSectionsWithData = () => {
    const { racers } = this.state.race;
    const sections = [];

    if (racers) {
      categories.forEach(category => {
        const data = racers
          .filter(({racer}) => racer.category === category)
          .sort(compareRacers);
        sections.push({
          title: category.toUpperCase(),
          count: data.length,
          data: data
        });
      });
    }
    return sections;
  }

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
    const { refreshing } = this.state;

    return (
      <View>
        {/* <FlatList
          style={styles.list}
          keyExtractor={({ id }) => id}
          renderItem={this.renderItem}
          data={racers}
          ListEmptyComponent={<ListItem title="Ucitavam natjecatelje" hideChevron={true} />}
          onRefresh={this.loadRacers}
          refreshing={refreshing}
        /> */}
        <SectionList
          keyExtractor={({ id }) => id}
          ListEmptyComponent={<ListItem title="Ucitavam natjecatelje" hideChevron={true} />}
          refreshing={refreshing}
          onRefresh={this.loadRacers}
          sections={this.getSectionsWithData()}
          renderSectionHeader={this.renderSectionHeader}
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
