import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
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
      incorrectEmail: false,
      sender: {}
      // recSent: false
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({sender: this.props.sender})
  }

  handleCategoryChange(category) {
    const lowerCaseCategory = category.toLowerCase();
    this.setState({category: lowerCaseCategory});
  }

  handleEmailChange(email) {
    this.setState({email});
  }

  handleMessageChange(message) {
    this.setState({message});
  }

  handleSubmit() {
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
      // socket.emit('newRec', this.state);
      this.setState({
        email: '',
        message: '',
        incorrectEmail: false
        // recSent: true
      })
    })
    .catch(err => {
      this.setState({incorrectEmail: true})
      console.log(err)
    })
  }

  render() {

    const categories = [{
      value: 'Books',
    }, {
      value: 'Movies',
    }, {
      value: 'Podcasts',
    }, {
      value: 'TV Shows',
    }];

    return (
      <View>
        <Text>REQUEST REC</Text>
        <Dropdown
          label='Category'
          data={categories}
          // containerStyle={sendRecStyles.input}
          onChangeText={this.handleCategoryChange}
        />
        <TextField
          // containerStyle={sendRecStyles.input}
          onChangeText={this.handleEmailChange}
          value={this.state.email}
          label="Request from (email)"
        />
        {
          this.state.incorrectEmail ?
          <Text>User doesn't exist</Text>
          : null
        }
        <TextField
          // containerStyle={sendRecStyles.input}
          onChangeText={this.handleMessageChange}
          value={this.state.message}
          label="Message"
        />
        <Button
          title="Send"
          onPress={this.handleSubmit}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  sender: state.currentUser
})

export default connect(mapStateToProps, null)(RequestRec)
