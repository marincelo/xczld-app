import { secondaryColor } from '../constants';
import { load } from '../fetchHelper';
import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';


export default class ClubList extends React.PureComponent {
  state = {
    clubs: [],
    refreshing: false
  }

  componentDidMount() {
    this.loadClubs();
  }

  loadClubs = load('clubs').bind(this);

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
        <FlatList
          keyExtractor={({ id }) => id}
          renderItem={this.renderItem}
          data={clubs}
          ListEmptyComponent={<ListItem title="Ucitavam klubove" hideChevron={true} />}
          onRefresh={this.loadClubs}
          refreshing={refreshing}
        />
      </View>
    );
  }
}

const styles = {
  rightTitle: {
    color: secondaryColor
  }
};
