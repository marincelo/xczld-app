import React from 'react';
import { View } from 'react-native';
import { Text, FormLabel, FormInput, Button } from 'react-native-elements';

class LoginScreen extends React.PureComponent {
  loginUser = () => {
    console.log('pressss');
    console.log(this.emailInput, this.phoneNumberInput)
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h2 style={styles.text}> Prijava </Text>

        <FormLabel style={styles.label}>Email</FormLabel>
        <FormInput
          inputStyle={styles.input}
          ref={ emailInput => this.emailInput = emailInput }
        />

        <FormLabel style={styles.label}>Broj mobitela</FormLabel>
        <FormInput
          inputStyle={ styles.input }
          ref={ phoneNumberInput => this.phoneNumberInput = phoneNumberInput }
        />

        <Button
          title='PRIJAVI SE'
          buttonStyle={styles.button}
          raised
          large
          onPress={ this.loginUser }
        />
      </View>
    )
  }
}

export default LoginScreen;

const primaryColor = '#009688';
const secondaryColor = '#ff5252';

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
  button: {
    backgroundColor: secondaryColor
  }
};
