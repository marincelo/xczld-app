import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Header, List, ListItem, Text } from 'react-native-elements';

export default class RaceList extends React.Component {
    state = {
        race: {},
        refreshing: false
    }

    componentDidMount() {
        this.loadRace()
    }

    loadRace = () => {
        const { params } = this.props.navigation.state

        this.setState({refreshing: true})

        fetch(`http://xczld.herokuapp.com/races/${params.raceId}.json`)
        .then(response => response.json())
        .then(json => {
            this.setState({race: json, refreshing: false})
        })
        .catch(error => console.log(error))
    }

    render() {
        const {race, refreshing} = this.state;

        return (<View style={style}>
            <Header
              centerComponent={{ text: 'XCZLD', style: { color: '#fff' } }}
              backgroundColor="#009688"
            />
            <Text h2 style={{textAlign: 'center'}}>
              {race && race.name}
            </Text>
            <List>
                <FlatList
                  keyExtractor={(item, index) => item.id}
                  renderItem={({item})=>(<ListItem
                      title={`${item.racer.first_name} ${item.racer.last_name}`}
                      subtitle={`Kategorija ${item.racer.category}`}
                    />)}
                  data={race.race_results}
                  ListEmptyComponent={<Text> Ucitavam... </Text>}
                  refreshing={refreshing}
                  onRefresh={this.loadRace}
                />
            </List>
          </View>)
    }
}

const style = {
    height: '80%',
}
