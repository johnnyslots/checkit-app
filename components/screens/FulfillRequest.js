import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import AwesomeAlert from 'react-native-awesome-alerts';
import { connect } from 'react-redux';
import axios from 'axios';
import IP from '../../secrets';
import socket from '../socket';

class FulfillRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestId: null,
      category: '',
      title: '',
      notes: '',
      email: '',
      toId: null,
      sender: {},
      displayNotification: false,
      emptyTitle: false
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetNavigation = this.resetNavigation.bind(this);
  }

  componentDidMount() {
    const { request } = this.props.navigation.state.params
    this.setState({
      requestId: request.id,
      category: request.category,
      email: request.from.email,
      toId: request.from.id,
      sender: this.props.sender
    })
  }

  handleTitleChange(title) {
    if(this.state.title) {
      this.setState({emptyTitle: false})
    }
    this.setState({title});
  }

  handleNotesChange(notes) {
    this.setState({notes});
  }

  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleSubmit() {
    if(!this.state.title) {
      this.setState({emptyTitle: true})
    }
    else {

    const recInfo = this.state
    axios.post(`${IP}/api/recommendations`, {recInfo})
    .then(() => {
      socket.emit('newRec', this.state);
      this.setState({
        requestId: null,
        category: '',
        title: '',
        notes: '',
        email: '',
        toId: null,
        sender: {},
        displayNotification: true
      })
      let that = this
      setTimeout(() => {
        that.setState({displayNotification: false})
        this.resetNavigation('MyLists')
      }, 1500)
    })
    .catch(err => console.log(err)
    )}
  }

  render() {

    const { email, category, emptyTitle } = this.state
    const checkmark = '\u2714'

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
        {
          emptyTitle ? <Text>Title can't be empty</Text> : null
        }
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
        <AwesomeAlert
          show={this.state.displayNotification}
          showProgress={false}
          title='Sent!'
          message={checkmark}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  sender: state.currentUser
})

export default connect(mapStateToProps, null)(FulfillRequest)
