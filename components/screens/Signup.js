import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Button, Text as ElementsText } from 'react-native-elements';
import { connect } from 'react-redux';
import { signup } from '../redux/auth';
import LoginIcons from './LoginIcons';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      error: ''
    };
    this.handleChangeFullName = this.handleChangeFullName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFullName(value) {
    this.setState({fullName: value});
  }

  handleChangeEmail(value) {
    this.setState({email: value});
  }

  handleChangePassword(value) {
    this.setState({password: value});
  }

  handleSubmit() {
    if (this.state.fullName && this.state.email && this.state.password) {
      const fullName = this.state.fullName;
      const email = this.state.email;
      const password = this.state.password;
      this.props.signup({
        fullName,
        email,
        password
      }, this.props.navigation);
      // clear the state after signup for security
      this.setState({
        fullName: '',
        email: '',
        password: '',
        error: ''
      });
    } else {
      this.setState({
        password: '',
        error: 'All fields are required'
      });
    }
  }

  render() {
   return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <View style={styles.header}>
        <ElementsText h1 style={styles.textFont}>
          Check
          <ElementsText h1 style={[styles.headerIt, styles.textFont]}>
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
          placeholder="Full Name"
          placeholderTextColor="gray"
          value={this.state.fullName}
          onChangeText={(fullName) => this.handleChangeFullName(fullName)}
        />
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
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title="Continue"
          onPress={this.handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
  signup: (credentials, navigation) => dispatch(signup(credentials, navigation))
});

export default connect(null, mapDispatchToProps)(Signup);

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
    borderBottomWidth: .5,
    borderRadius: 5,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#008242',
    width: '85%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 4,
    marginTop: 15
  },
  buttonText: {
    fontSize: 15
  },
  error: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  textFont: {
    fontFamily: 'Palatino'
  }
});
