import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Header, List, ListItem, Text } from 'react-native-elements';

export default class RaceList extends React.Component {
    state = {
        races: [],
        refreshing: false
    }

    componentDidMount() {
        this.loadRaces()
    }

    loadRaces = () => {
        this.setState({refreshing: true})

        fetch('http://xczld.herokuapp.com/races.json')
        .then(response => response.json())
        .then(json => {
            this.setState({races: json, refreshing: false})
        })
        .catch(error => console.log(error))
    }

    render() {
        const { races, refreshing } = this.state;
        const { setRace } = this.props;
        const { navigate } = this.props.navigation;

        return (<View>
            <List style={style}>
                <FlatList
                keyExtractor={(item, index) => item.id}
                renderItem={({item})=>(<ListItem
                    title={`${item.name}`}
                    onPress={ () => navigate('Race', {raceId: item.id}) }
                    />)}
                data={races}
                ListEmptyComponent={<Text> Ucitavam utrke </Text>}
                onRefresh={this.loadRaces}
                refreshing={refreshing}
                />
            </List>
        </View>)
    }
}

const style = {
    height: '80%',
    marginTop: 70,
}
