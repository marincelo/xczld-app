import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';


export default class ClubList extends PureComponent {
  state = {
    clubs: [],
    refreshing: false
  }

  componentDidMount() {
      this.loadClubs();
  }

  loadClubs = () => {
      this.setState({refreshing: true});

      fetch('http://xczld.herokuapp.com/clubs.json')
      .then(response => response.json())
      .then(json => this.setState({clubs: json, refreshing: false}))
      .catch(error => console.log(error));
  }

  renderItem = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      rightTitle={`${item.points} Bodova`}
      rightTitleStyle={styles.rightTitle}
      subtitle={`Broj članova: ${item.racers_count}`}
    />
  );

  render() {
    const { clubs, refreshing } = this.state;

    return (
      <View>
        <List style={styles.list}>
          <FlatList
            keyExtractor={({ id }) => id}
            renderItem={this.renderItem}
            data={clubs}
            ListEmptyComponent={<Text> Nema podataka </Text>}
            onRefresh={this.loadClubs}
            refreshing={refreshing}
          />
        </List>
      </View>
    );
  }
}

const styles = {
  list: {
    height: '100%'
  },
  rightTitle: {
    color: '#ff5252'
  }
};
