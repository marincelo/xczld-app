import { categories, secondaryColor } from '../constants';
import { loadResource } from '../fetchHelper';
import React from 'react';
import { View, SectionList } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

export default class RaceList extends React.Component {
    state = {
        race: {},
        refreshing: false
    };

    componentDidMount() {
        this.loadRace();
    }

    getSectionsWithData = () => {
        const { race_results } = this.state.race;
        const sections = [];

        if (race_results) {
            categories.forEach(category => {
                sections.push({
                    title: category.toUpperCase(),
                    data: race_results.filter(({racer}) => racer.category === category)
                });
            });
        }
        return sections;
    }

    loadRace = loadResource('race', this.props.navigation.state.params.raceId);

    getItemSubtitle = (item, racer) => {
        if (this.state.race.ended_at) {
            return `Kategorija: ${racer.category.toUpperCase()}  Vrijeme: ${item.finish_time}  Bodovi: ${item.points}`;
        }
        else {
            return `Kategorija: ${racer.category.toUpperCase()}`;
        }
    }

    renderSectionHeader = ({section}) => (<ListItem
        titleStyle={{ fontWeight: 'bold', fontSize: 22 }}
        title={section.title}
        hideChevron={true}
      />);

    renderListItem = ({item, item: {racer}})=>(<ListItem
        leftIcon={<Text style={styles.leftIcon}> {racer.start_number.value} </Text>}
        title={`${racer.first_name} ${racer.last_name}`}
        subtitleNumberOfLines={2}
        subtitle={this.getItemSubtitle(item, racer)}
        rightTitle={racer.club.name}
        hideChevron={true}
        onPress={() =>
            this.props.navigation.navigate('Racer', { racerId: racer.id })}
      />);

    render() {
        const {race, refreshing} = this.state;

        return (<View style={styles.container}>
            <Text h2 style={{textAlign: 'center'}}>
              {race && race.name}
            </Text>
            <Text h4 style={{ marginTop: 10, marginLeft: 20 }}>
                Natjecatelji
                <Text style={{ color: secondaryColor }}> {race.race_results && race.race_results.length}</Text>
            </Text>
            <List>
                <SectionList
                    keyExtractor={(item, index) => item.id}
                    ListEmptyComponent={<ListItem title="Ucitavam..." hideChevron={true} />}
                    refreshing={refreshing}
                    onRefresh={this.loadRace}
                    sections={this.getSectionsWithData()}
                    renderSectionHeader={this.renderSectionHeader}
                    renderItem={this.renderListItem}
                />
            </List>
          </View>);
    }
}

const styles = {
    container: {
        height: '80%',
        marginTop: 75
    },
    leftIcon: {
        fontSize: 16,
        fontWeight: 'bold',
        color: secondaryColor,
        paddingTop: 8,
        paddingRight: 10
    }
};
