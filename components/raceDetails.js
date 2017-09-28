import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

export default class RaceList extends React.Component {
    state = {
        race: {},
        refreshing: false
    }

    componentDidMount() {
        this.setState({refreshing: true});
        fetch(`http://xczld.herokuapp.com/races/${this.props.raceId}.json`)
        .then(response => response.json())
        .then(json => {
            this.setState({race: json, refreshing: false});
        })
        .catch(error => console.log(error));
    }

    render() {
        const {race} = this.state;

        return (<View style={style}>
            <Text h2 style={{textAlign: 'center'}}>
              {race && race.name}
            </Text>
            <List>
              {
                race.race_results ?
                <FlatList
                  keyExtractor={(item, index) => item.id}
                  renderItem={({item})=>(<ListItem
                      title={`${item.racer.first_name} ${item.racer.last_name}`}
                      subtitle={`Kategorija ${item.racer.category}`}
                    />)}
                  data={race.race_results}
                />
                : undefined
              }
            </List>
          </View>)
    }
}

const style = {
    height: '80%',
    marginTop: 70,
}
