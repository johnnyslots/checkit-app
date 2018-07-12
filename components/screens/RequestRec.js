import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
// import { TextField } from 'react-native-material-textfield';
import AwesomeAlert from 'react-native-awesome-alerts';
import { connect } from 'react-redux';
import axios from 'axios';
import IP from '../../secrets';
import socket from '../socket';

class RequestRec extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      message: '',
      email: '',
      sender: {},
      displayNotification: false,
      emptyCategory: false
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      sender: this.props.sender,
      email: this.props.friend.email
    })
  }

  handleCategoryChange(category) {
    if(this.state.emptyCategory) {
      this.setState({emptyCategory: false})
    }
    const lowerCaseCategory = category.toLowerCase();
    this.setState({category: lowerCaseCategory});
  }

  handleMessageChange(message) {
    this.setState({message});
  }

  handleSubmit() {
    if(!this.state.category) {
      this.setState({emptyCategory: true})
    }
    else {
      const userEmail = this.state.email.toLowerCase();
      const requestInfo = this.state
      axios.get(`${IP}/api/users/${userEmail}`)
      .then(res => {
        if(res.data.email) {
          const toId = res.data.id
          return axios.post(`${IP}/api/requests`, {requestInfo, toId})
          .catch(err => console.log(err))
        }
      })
      .then(() => {
        socket.emit('newRecRequest', (this.state));
        this.setState({
          message: '',
          displayNotification: true
        })
        setTimeout(() => {this.setState({displayNotification: false})}, 1500)
      })
      .catch(err => console.log(err)
    )}
  }

  render() {
    const { emptyCategory } = this.state
    const { friend } = this.props
    const categories = [{
      value: 'Books',
    }, {
      value: 'Movies',
    }, {
      value: 'Podcasts',
    }, {
      value: 'TV Shows'
    }];
    const checkmark = '\u2714'

    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <Text style={[styles.textFont, styles.header]}>{friend.fullName}</Text>
        <Dropdown
          placeholder='Category'
          data={categories}
          onChangeText={this.handleCategoryChange}
          itemTextStyle={styles.textFont}
          style={styles.textFont}
        />
        {
          emptyCategory ? <Text style={[styles.error, styles.textFont]}>Category can't be empty</Text> : null
        }
        <View style={styles.textAreaContainer}>
          <TextInput
            onChangeText={this.handleMessageChange}
            value={this.state.message}
            placeholder="Message"
            multiline={true}
            numberOfLines={6}
          />
        </View>
        <Button
          title="Send"
          onPress={this.handleSubmit}
          buttonStyle={styles.button}
          textStyle={styles.textFont}
          rightIcon={{name: 'send', type: 'material-icon'}}
        />
        <AwesomeAlert
          show={this.state.displayNotification}
          showProgress={false}
          title='Sent!'
          message={checkmark}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
  sender: state.currentUser
})

export default connect(mapStateToProps, null)(RequestRec)

const styles = StyleSheet.create({
  container: {
    margin: 15
  },
  header: {
    alignSelf: 'center',
    fontSize: 22,
    color: '#646360',
    marginTop: 15
  },
  button: {
    backgroundColor: '#008242',
    width: '95%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15
  },
  textAreaContainer: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: .8,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    height: 120,
    alignSelf: 'center',
  },
  textFont: {
    fontFamily: 'Palatino'
  },
  error: {
    fontSize: 15,
    color: 'red'
  }
});
