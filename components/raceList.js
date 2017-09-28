import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

export default class RaceList extends React.Component {
    state = {
        races: [],
        refreshing: false
    }

    componentDidMount() {
        this.setState({refreshing: true});
        fetch('http://xczld.herokuapp.com/races.json')
        .then(response => response.json())
        .then(json => {
            this.setState({races: json, refreshing: false});
        })
        .catch(error => console.log(error));
    }

    render() {
        const {races} = this.state;
        const {setRace} = this.props;

        return (<List style={style}>
        {
            races ?
            <FlatList
            keyExtractor={(item, index) => item.id}
            renderItem={({item})=>(<ListItem
                title={`${item.name}`}
                onPress={ () => setRace(item.id)}
                />)}
            data={races}
            ListEmptyComponent={<Text> Nema utrka... </Text>}
            refreshing={this.state.refreshing}
            />
            : undefined
        }
        </List>)
    }
}

const style = {
    height: '80%',
    marginTop: 70,
}
