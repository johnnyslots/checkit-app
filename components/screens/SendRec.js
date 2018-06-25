import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import axios from 'axios';
import IP from '../../secrets';
import socket from '../socket';

class SendRec extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      title: '',
      notes: '',
      email: '',
      sender: {}
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
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

  handleTitleChange(title) {
    this.setState({title});
  }

  handleNotesChange(notes) {
    this.setState({notes});
  }

  handleSubmit() {
    const userEmail = this.state.email.toLowerCase();
    const recInfo = this.state
    axios.get(`${IP}/api/users/${userEmail}`)
    .then(res => {
      if(res.data.email) {
        const toId = res.data.id
        return axios.post(`${IP}/api/recommendations`, {recInfo, toId})
        .catch(err => console.log(err))
      }
    })
    .then(() => {
      socket.emit('newRec', this.state);
      this.setState({
        title: '',
        notes: ''
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
        <Text>SEND RECOMMENDATION TO {friend.fullName}</Text>
        <Dropdown
          label='Category'
          data={categories}
          // containerStyle={sendRecStyles.input}
          onChangeText={this.handleCategoryChange}
        />
        <TextField
          // containerStyle={sendRecStyles.input}
          onChangeText={this.handleTitleChange}
          value={this.state.title}
          label="Title"
        />
        <TextField
          // containerStyle={sendRecStyles.input}
          onChangeText={this.handleNotesChange}
          value={this.state.notes}
          label="Notes"
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

export default connect(mapStateToProps, null)(SendRec)
