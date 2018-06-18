import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import axios from 'axios';
import IP from '../../secrets';

class FulfillRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      title: '',
      notes: '',
      email: '',
      toId: null,
      sender: {}
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { request } = this.props.navigation.state.params
    this.setState({
      category: request.category,
      email: request.from.email,
      toId: request.from.id,
      sender: this.props.sender
    })
  }

  handleTitleChange(title) {
    this.setState({title});
  }

  handleNotesChange(notes) {
    this.setState({notes});
  }

  handleSubmit() {
    // const userEmail = this.state.email.toLowerCase();
    const recInfo = this.state
    axios.post(`${IP}/api/recommendations`, {recInfo, fulfillingRequest: true})
    .then(() => {
      this.setState({
        category: '',
        title: '',
        notes: '',
        email: '',
        toId: null,
        sender: {}
      })
    })
    .catch(err => console.log(err))
  }

  render() {

    const { email, category } = this.state

    return (
      <View>
        <Text>FULFILL REQUEST</Text>
        <Text>To: {email}</Text>
        <Text>Category: {category}</Text>
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

export default connect(mapStateToProps, null)(FulfillRequest)
