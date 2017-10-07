import { serverUrl, categories, primaryColor, secondaryColor } from '../constants';
import { loadResource } from '../fetchHelper';
import React from 'react';
import { View, SectionList, AsyncStorage, ToastAndroid } from 'react-native';
import { List, ListItem, Text, Button } from 'react-native-elements';

export default class RaceList extends React.Component {
  state = {
    race: {},
    user: {},
    refreshing: false
  };

  componentDidMount() {
    this.loadRace();
    AsyncStorage.getItem('@xczld:user')
    .then(user_data => {
      if (user_data){
       this.setState({ user: JSON.parse(user_data) })
      }
    });
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

  loadRace = loadResource('race', this.props.navigation.state.params.raceId).bind(this);

  isUserRegistered = () => {
    const { race, user } = this.state;
    return race.race_results && race.race_results.find(item => item.racer_id === user.id);
  }

  userActions = () => {
    const { user } = this.state;

    if (!user) return;

    if (this.isUserRegistered()) {
      return (<Button
        title={`Odjavi ${user.first_name}`}
        iconRight={{ name: 'remove-circle-outline' }}
        buttonStyle={{...styles.button, backgroundColor: secondaryColor, marginTop: 10}}
        onPress={this.unRegisterRacer}
      />);
    }
    else {
      return (<Button
        title={`Prijavi ${user.first_name}`}
        iconRight={{ name: 'playlist-add-check' }}
        buttonStyle={styles.button}
        onPress={this.registerRacer}
      />);
    }
  }

  registerRacer = () => {
    const { race, user } = this.state;
    const form = new FormData();

    form.append('race_result[race_id]', race.id);
    form.append('race_result[racer_id]', user.id);
    form.append('race_result[status]', 1);

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: form
    };

    fetch(`${serverUrl}/race_results`, options)
    .then(response => {
      if (response.status === 201) {
        ToastAndroid.show('Uspjesno prijavljen!', ToastAndroid.LONG);
        this.loadRace();
      }
      else {
        ToastAndroid.show('Nije uspjelo. Pokusaj ponovno.', ToastAndroid.LONG);
      }
    })
    .catch(error => console.log(error));
  }

  unRegisterRacer = () => {
    const { race, user } = this.state;
    const raceResult = race.race_results.find(item => item.racer_id === user.id);

    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    };

    fetch(`${serverUrl}/race_results/${raceResult.id}`, options)
    .then(response => {
      if (response.status === 204) {
        ToastAndroid.show('Uspjesno odjavljen!', ToastAndroid.LONG);
        this.loadRace();
      }
      else {
        ToastAndroid.show('Nije uspjelo. Pokusaj ponovno.', ToastAndroid.LONG);
      }
    })
    .catch(error => console.log(error));

  }

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
    subtitle={this.getItemSubtitle(item, racer)}
    rightTitle={racer.club.name}
    onPress={() =>
        this.props.navigation.navigate('Racer', { racerId: racer.id })}
  />);

  render() {
    const {race, refreshing, user} = this.state;

    return (<View style={styles.container}>
      <Text h2 style={{textAlign: 'center'}}>
        {race && race.name}
      </Text>
      <View>
        { this.userActions() }
      </View>
      <Text h4 style={{ marginTop: 10, marginLeft: 20 }}>
        Natjecatelji
        <Text style={{ color: secondaryColor }}> {race.race_results && race.race_results.length}</Text>
      </Text>
      <SectionList
          keyExtractor={(item, index) => item.id}
          ListEmptyComponent={<ListItem title="Ucitavam..." hideChevron={true} />}
          refreshing={refreshing}
          onRefresh={this.loadRace}
          sections={this.getSectionsWithData()}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderListItem}
      />
    </View>);
  }
}

const styles = {
    container: {
        height: '85%',
        marginTop: 75
    },
    leftIcon: {
        fontSize: 16,
        fontWeight: 'bold',
        color: secondaryColor,
        paddingTop: 8,
        paddingRight: 10
    },
    button: {
        backgroundColor: primaryColor
    }
};
