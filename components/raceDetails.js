import { serverUrl, primaryColor, secondaryColor } from '../constants';
import { getSectionsWithData, renderSectionHeader } from '../racerHelpers';
import { loadResource } from '../fetchHelper';
import React from 'react';
import { View, SectionList, AsyncStorage, ToastAndroid } from 'react-native';
import { ListItem, Text, Button } from 'react-native-elements';

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
       this.setState({ user: JSON.parse(user_data) });
      }
    });
  }

  getSections = () => {
    const { race, race: { race_results } } = this.state;

    return getSectionsWithData(race_results, race);
  }

  loadRace = loadResource('race', this.props.navigation.state.params.raceId).bind(this);

  isUserRegistered = () => {
    const { race, user } = this.state;
    return race.race_results && race.race_results.find(item => item.racer_id === user.id);
  }

  userActions = () => {
    const { user, race } = this.state;

    if (!user.email || race.ended_at) { return; }

    const raceDate = new Date(race.date);
    const now = new Date();
    // do not show button if less that 24 hours until race start
    if ( (raceDate - now) < 24 * 3600 * 1000 )  { return; }

    if (this.isUserRegistered()) {
      return (<Button
        title={`Odjavi ${user.first_name} ${user.last_name}`}
        iconRight={{ name: 'remove-circle-outline' }}
        buttonStyle={{...styles.button, backgroundColor: secondaryColor, marginTop: 10}}
        onPress={this.unRegisterRacer}
      />);
    }
    else {
      return (<Button
        title={`Prijavi ${user.first_name} ${user.last_name}`}
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
        return `Vrijeme: ${item.finish_time} Bodovi: ${item.points || '-'}`;
    }
    else {
        return `Kategorija: ${racer.category.toUpperCase()}`;
    }
  }

  renderListItem = ({ item, item: { racer } })=>(<ListItem
    leftIcon={<Text style={styles.leftIcon}> {racer.start_number.value} </Text>}
    title={`${racer.first_name} ${racer.last_name}`}
    subtitle={this.getItemSubtitle(item, racer)}
    subtitleNumberOfLines={ 3 }
    rightTitle={racer.club.name}
    onPress={() =>
        this.props.navigation.navigate('Racer', { racerId: racer.id })}
  />);

  render() {
    const { race, refreshing } = this.state;

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
          sections={this.getSections()}
          renderSectionHeader={renderSectionHeader}
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
