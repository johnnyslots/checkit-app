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
      sender: {},
      // requestSent: false
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
    const lowerCaseCategory = category.toLowerCase();
    this.setState({category: lowerCaseCategory});
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
      socket.emit('newRecRequest', (this.state));
      this.setState({
        message: ''
        // recSent: true
      })
    })
    .catch(err => console.log(err)
  )}

  render() {
    const { friend } = this.props
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
        <Text>REQUEST A RECOMMENDATION FROM {friend.fullName}</Text>
        <Dropdown
          label='Category'
          data={categories}
          // containerStyle={sendRecStyles.input}
          onChangeText={this.handleCategoryChange}
        />
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
