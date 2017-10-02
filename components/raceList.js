// @flow
import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import connect from '../redux/connect';
import * as actions from '../redux/modules/races';
import { getIsLoading, getRaces } from '../redux/selectors/races';

type Race = {
  id: number,
  name: string,
  date: Date,
  ended_at: Date
};

type Info = {
  item: Race
};

@connect(
  {
    races: getRaces,
    isLoading: getIsLoading
  },
  { load: actions.load }
)
class RaceList extends PureComponent {
  componentDidMount() {
    this.props.load();
  }

  renderItem = ({ item }: Info) => (
    <ListItem
      title={`${item.name}`}
      subtitle={new Date(item.date).toLocaleString()}
      rightTitle={item.ended_at ? 'Zavrsena' : 'Nadolazeca'}
      onPress={() =>
        this.props.navigation.navigate('Race', { raceId: item.id })}
    />
  );

  render() {
    const { races, load, isLoading } = this.props;

    return (
      <View>
        <List {...{ style }}>
          <FlatList
            keyExtractor={({ id }) => id}
            renderItem={this.renderItem}
            data={races}
            ListEmptyComponent={<Text> Ucitavam utrke </Text>}
            onRefresh={load}
            refreshing={!!isLoading}
          />
        </List>
      </View>
    );
  }
}

export default RaceList;

const style = {
  height: '80%',
  marginTop: 70
};
