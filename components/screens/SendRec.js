import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
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
      incorrectEmail: false,
      senderId: null,
      recSent: false
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({senderId: this.props.senderId})
  }

  handleCategoryChange(category) {
    const lowerCaseCategory = category.toLowerCase();
    this.setState({category: lowerCaseCategory});
  }

  handleEmailChange(email) {
    this.setState({email});
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
        email: '',
        title: '',
        notes: '',
        incorrectEmail: false,
        recSent: true
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
        <Text>SEND REC</Text>
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
          label="Send to (email)"
        />
        {
          this.state.incorrectEmail ?
          <Text>User doesn't exist</Text>
          : null
        }
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
  senderId: state.currentUser.id
})

export default connect(mapStateToProps, null)(SendRec)
