import { serverUrl, secondaryColor } from '../constants';
import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Text, FormLabel, FormInput, Button } from 'react-native-elements';

class LoginScreen extends React.PureComponent {
  state = {
    emailInput: '',
    phoneNumberInput: '',
    errorMessage: ''
  }

  async componentWillMount() {
    const user = await AsyncStorage.getItem('@xczld:user');
    const {email, phone_number} = user;

    this.setState({emailInput: email, phoneNumberInput: phone_number});
  }

  loginUser = () => {
    const { emailInput, phoneNumberInput } = this.state;

    if (emailInput && phoneNumberInput) {
      const form = new FormData();

      form.append('racer[email]', emailInput);
      form.append('racer[phone_number]', phoneNumberInput);

      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: form
      };

      fetch(`${serverUrl}/racers/login`, options)
      .then(response => response.json())
      .then(json => AsyncStorage
        .setItem('@xczld:user', json)
        .then(() => {
          if (json.email && json.phone_number) {
            this.props.navigation.navigate('Home');
          }
        })
      )
      .catch(error => this.setState({errorMessage: error}));
    }
    else {
      this.setState({errorMessage: 'Unesi email i broj mobitela i pokusaj ponovno.'});
    }
  };

  render() {
    const {emailInput, phoneNumberInput, errorMessage} = this.state;

    return (
      <View style={styles.container}>
        <Text h2 style={styles.text}> Prijava </Text>

        <FormLabel style={styles.label}>Email</FormLabel>
        <FormInput
          inputStyle={styles.input}
          onChangeText={ text => this.setState({emailInput: text}) }
          value={emailInput}
        />

        <FormLabel style={styles.label}>Broj mobitela</FormLabel>
        <FormInput
          inputStyle={ styles.input }
          onChangeText={ text => this.setState({phoneNumberInput: text}) }
          value={phoneNumberInput}
        />

        <Text h4 style={styles.errorMessage}> {errorMessage} </Text>

        <Button
          title="PRIJAVI SE"
          buttonStyle={styles.button}
          raised
          large
          onPress={ this.loginUser }
        />
      </View>
    );
  }
}

export default LoginScreen;

const styles = {
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginBottom: 40
  },
  label: {
  },
  input: {
    borderBottomColor: secondaryColor,
    marginBottom: 40
  },
  errorMessage: {
    color: secondaryColor,
    textAlign: 'center'
  },
  button: {
    backgroundColor: secondaryColor
  }
};
