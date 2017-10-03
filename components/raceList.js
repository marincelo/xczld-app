// @flow
import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import type { NavigationNavigatorProps } from 'react-navigation';
import connect from '../redux/connect';
import * as actions from '../redux/modules/races';
import { getIsLoading, getRaces } from '../redux/selectors/races';

type Race = {
  id: number,
  name: string,
  date: string,
  ended_at: string
};

type Info = {
  item: Race
};

type Props = {
  load: () => mixed,
  initialLoad: () => mixed,
  races: Race[],
  isLoading: boolean,
  navigation: NavigationNavigatorProps
};

type DefaultProps = {
  races: [],
  isLoading: boolean
};

@connect(
  {
    races: getRaces,
    isLoading: getIsLoading
  },
  {
    load: actions.load,
    initialLoad: actions.initialLoad
  }
)
class RaceList extends PureComponent<DefaultProps, Props, void> {
  static defaultProps = {
    races: [],
    isLoading: false
  };

  componentDidMount() {
    this.props.initialLoad();
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
  height: '100%'
};
