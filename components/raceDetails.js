import React from 'react';
import { View, SectionList } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

export default class RaceList extends React.Component {
    state = {
        race: {},
        refreshing: false
    };

    categories = ['zene', 'u16', '16-20', '20-30', '30-40', '40-50', '50+'];

    componentDidMount() {
        this.loadRace()
    }

    getSectionsWithData = () => {
        const sections = [];
        if(this.state.race.race_results) {
            this.categories.forEach(category => {
                sections.push({
                    title: category.toUpperCase(),
                    data: this.state.race.race_results.filter(rr => {
                        return rr.racer.category === category
                    })
                })
            })
        }
        return sections;
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
            <Text h2 style={{textAlign: 'center'}}>
              {race && race.name}
            </Text>
            <Text h4 style={{ marginTop: 10, marginLeft: 20 }}>
                Natjecatelji
                <Text style={{ color: '#ff5252' }}> {race.race_results && race.race_results.length}</Text>
            </Text>
            <List>
                <SectionList
                    keyExtractor={(item, index) => item.id}
                    ListEmptyComponent={<Text> Ucitavam... </Text>}
                    refreshing={refreshing}
                    onRefresh={this.loadRace}
                    sections={this.getSectionsWithData()}
                    renderSectionHeader={({section}) => (<ListItem
                      titleStyle={{ fontWeight: 'bold', fontSize: 22 }}
                      title={section.title}
                      hideChevron={true}
                    />)}
                    renderItem={({item})=>(<ListItem
                      leftIcon={<Text style={{ fontWeight: 'bold', color: '#ff5252', paddingTop: 12, paddingRight: 10, fontSize: 16 }}> {item.racer.start_number.value} </Text>}
                      title={`${item.racer.first_name} ${item.racer.last_name}`}
                      subtitleNumberOfLines={3}
                      subtitle={`Kategorija: ${item.racer.category.toUpperCase()}  Vrijeme: ${item.finish_time}  Bodovi: ${item.points || '- -'}`}
                      rightTitle={item.racer.club.name}
                    />)}
                />
            </List>
          </View>)
    }
}

const style = {
    height: '80%',
    marginTop: 75
}
