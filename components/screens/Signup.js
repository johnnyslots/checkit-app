import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';

import { signup } from '../redux/auth';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: ''
    };
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFirstName(value) {
    this.setState({firstName: value});
  }

  handleChangeLastName(value) {
    this.setState({lastName: value});
  }

  handleChangeEmail(value) {
    this.setState({email: value});
  }

  handleChangePassword(value) {
    this.setState({password: value});
  }

  handleSubmit() {
    if (this.state.firstName && this.state.lastName
      && this.state.email && this.state.password) {
      const firstName = this.state.firstName;
      const lastName = this.state.lastName;
      const email = this.state.email;
      const password = this.state.password;
      this.props.signup({
        firstName,
        lastName,
        email,
        password
      }, this.props.navigation);
      // clear the state after signup for security
      this.setState({
        firstName: '',
        lastName: '',
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
      <ScrollView>
        <Text style={styles.error}>{this.state.error}</Text>
        <Text style={styles.textLabel}>First Name</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          value={this.state.firstName}
          onChangeText={(firstName) => this.handleChangeFirstName(firstName)}
        />
        <Text style={styles.textLabel}>Last Name</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          value={this.state.lastName}
          onChangeText={(lastName) => this.handleChangeLastName(lastName)}
        />
        <Text style={styles.textLabel}>Email</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          value={this.state.email}
          onChangeText={(email) => this.handleChangeEmail(email)}
        />
        <Text style={styles.textLabel}>Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          value={this.state.password}
          onChangeText={(password) => this.handleChangePassword(password)}
        />
        <Button
          buttonStyle={styles.button}
          title="Sign Up"
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
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    flex: 1
  },
  textLabel: {
    fontSize: 20,
    marginTop: 10,
    padding: 10
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
    color: 'tomato',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 5
  },
  button: {
    backgroundColor: 'gray',
    width: 150,
    height: 40,
    borderRadius: 5,
    alignSelf: 'center'
  },
  error: {
    fontSize: 15,
    color: 'blue',
    marginVertical: 0,
    paddingLeft: 10,
    fontWeight: 'bold'
  }
});
