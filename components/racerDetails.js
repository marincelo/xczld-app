import { serverUrl } from '../constants';
import React from 'react';
import { View, FlatList } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

export default class RacerDetails extends React.Component {
  state = {
    racer: {}
  };

  componentDidMount() {
    this.loadRacer();
  }

  loadRacer = () => {
    const { params } = this.props.navigation.state;

    fetch(`${serverUrl}/racers/${params.racerId}.json`)
    .then(response => response.json())
    .then(json => this.setState({racer: json}))
    .catch(error => console.log(error));
  }


  renderItem = ({ item }) => (
    <ListItem
      title={item.race.name}
      subtitle={`${item.points || '--'} bodova`}
      rightTitle={item.finish_time}
      onPress={() =>
        this.props.navigation.navigate('Race', { raceId: item.race.id })}
    />
  );


  render() {
    const {racer} = this.state;

    return (<View style={styles.container}>
      <Text h2 style={styles.header}>{`${racer.start_number && racer.start_number.value} - ${racer.first_name} ${racer.last_name}`}</Text>
      <Text h4 style={styles.header}> { racer.club && racer.club.name } </Text>
      <Text h4 style={styles.header}> Kategorija { racer.category && racer.category.toUpperCase() } </Text>

      <List>
        <FlatList
          keyExtractor={({ id }) => id}
          renderItem={this.renderItem}
          data={racer.race_results}
          ListEmptyComponent={<ListItem title="Nema utrka" hideChevron={true} />}
        />
      </List>
    </View>);
  }
}

const styles = {
  container: {
    height: '80%',
    marginTop: 75,
  },
  header: {
    marginLeft: 40
  }
};
