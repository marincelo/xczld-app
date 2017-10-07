import React from 'react';
import { View, } from 'react-native';
import { Text } from 'react-native-elements';

export default class RacerDetails extends React.Component {
    state = {
      racer: {}
    };

    componentDidMount() {
      this.loadRacer();
    }

    loadRacer = () => {
      const { params } = this.props.navigation.state;

      fetch(`http://xczld.herokuapp.com/racers/${params.racerId}.json`)
      .then(response => response.json())
      .then(json => this.setState({racer: json}))
      .catch(error => console.log(error));
    }

    render() {
      const {racer} = this.state;

      return (<View style={styles.container}>
        <Text h2 style={{textAlign: 'center'}}>
          {`${racer.start_number && racer.start_number.value} - ${racer.first_name} ${racer.last_name}`}
        </Text>
      </View>);
    }
}

const styles = {
  container: {
    height: '80%',
    marginTop: 75
  }
};
