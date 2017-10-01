// @flow
import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import connect from '../redux/connect';
import { load } from '../redux/modules/races';
import { getRaces } from '../redux/selectors/races';

@connect({ races: getRaces }, { load })
class RaceList extends PureComponent {
  state = {
    refreshing: false
  };

  componentDidMount() {
      this.setState({ refreshing: true })
      this.props.load();
      this.setState({ refreshing: false});
  }

  render() {
    const { refreshing } = this.state;
    const { races, navigation: { navigate } } = this.props;

    return (<View>
        <List style={style}>
            <FlatList
            keyExtractor={(item, index) => item.id}
            renderItem={({item})=>(<ListItem
                title={`${item.name}`}
                subtitle={ (new Date(item.date)).toLocaleString() }
                rightTitle={ item.ended_at ? 'Zavrsena' : 'Nadolazeca' }
                onPress={ () => navigate('Race', {raceId: item.id}) }
                />)}
            data={races}
            ListEmptyComponent={<Text> Ucitavam utrke </Text>}
            onRefresh={this.loadRaces}
            refreshing={refreshing}
            />
        </List>
    </View>);
  }
}

export default RaceList;

const style = {
    height: '80%',
    marginTop: 70,
};
