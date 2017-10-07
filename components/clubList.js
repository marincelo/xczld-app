import { serverUrl, secondaryColor } from '../constants';
import React from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';


export default class ClubList extends React.PureComponent {
  state = {
    clubs: [],
    refreshing: false
  }

  componentDidMount() {
      this.loadClubs();
  }

  loadClubs = () => {
      this.setState({refreshing: true});

      fetch(`${serverUrl}/clubs.json`)
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
      onPress={ () =>
        this.props.navigation.navigate('Club', { clubId: item.id })}
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
            ListEmptyComponent={<ListItem title="Ucitavam klubove" hideChevron={true} />}
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
    color: secondaryColor
  }
};
