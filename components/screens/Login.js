import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Button, Text as ElementsText } from 'react-native-elements';
import { connect } from 'react-redux';
import { login } from '../redux/auth';
import LoginIcons from './LoginIcons';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '' || (this.props.navigation.state.params && this.props.navigation.state.params.error)
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(value) {
    this.setState({email: value});
  }

  handleChangePassword(value) {
    this.setState({password: value});
  }

  handleSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    this.props.login({
      email,
      password
    }, this.props.navigation);
    // clear the state after login for security
    this.setState({
      email: '',
      password: '',
      error: ''
    });
  }

  render() {
   return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <View style={styles.header}>
        <ElementsText h1>
          Check
            <ElementsText h1 style={styles.headerIt}>
            It
            </ElementsText>
          </ElementsText>
      </View>
      <LoginIcons />
      <ScrollView>
        <Text style={styles.error}>{this.state.error}</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={30}
          placeholder="Email"
          placeholderTextColor="gray"
          value={this.state.email}
          onChangeText={(email) => this.handleChangeEmail(email)}
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          placeholder="Password"
          placeholderTextColor="gray"
          value={this.state.password}
          onChangeText={(password) => this.handleChangePassword(password)}
        />
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            title="Continue"
            onPress={this.handleSubmit}
          />

          <Button
            buttonStyle={[styles.button, styles.signupButton]}
            textStyle={styles.buttonText}
            title="No account? Sign up!"
            onPress={() => {
              this.props.navigation.navigate('Signup');
              this.setState({
                email: '',
                password: '',
                error: ''
              });
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
  login: (credentials, navigation) => dispatch(login(credentials, navigation))
});

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  header: {
    alignSelf: 'center'
  },
  headerIt: {
    color: '#008242'
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 5,
    color: 'black',
    fontSize: 15,
    borderBottomWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 5
  },
  button: {
    backgroundColor: '#008242',
    width: '85%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 4

  },
  signupButton: {
    backgroundColor: '#646360'
  },
  buttonText: {
    fontSize: 15
  },
  error: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});
