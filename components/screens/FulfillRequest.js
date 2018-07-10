import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
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
      fullName: '',
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
      fullName: request.from.fullName,
      toId: request.from.id,
      sender: this.props.sender
    })
  }

  handleTitleChange(title) {
    if(this.state.emptyTitle) {
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

    const { fullName, category, emptyTitle } = this.state
    const checkmark = '\u2714'

    return (
      <View style={styles.container}>
        <Text style={[styles.textFont, styles.header, styles.headerFullName]}>{fullName}</Text>
        <Text style={[styles.textFont, styles.header, styles.headerSubtitle]}>Category: {category}</Text>
          <TextInput
            style={[styles.textInput, styles.textFont]}
            onChangeText={this.handleTitleChange}
            value={this.state.title}
            placeholder="Title"
          />
        {
          emptyTitle ? <Text style={[styles.error, styles.textFont]}>Title can't be empty</Text> : null
        }
        <View style={styles.textAreaContainer}>
          <TextInput
            onChangeText={this.handleNotesChange}
            value={this.state.notes}
            placeholder="Notes"
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
      </View>
    )
  }
}

const mapStateToProps = state => ({
  sender: state.currentUser
})

export default connect(mapStateToProps, null)(FulfillRequest)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    alignSelf: 'center',
    fontSize: 22,
    color: '#646360',
  },
  headerFullName: {
    fontWeight: 'bold',
    marginTop: 25
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 15,
    marginTop: 10
  },
  button: {
    backgroundColor: '#008242',
    width: '95%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15
  },
  textInput: {
    height: 40,
    width: '92%',
    margin: 5,
    color: 'black',
    fontSize: 15,
    borderBottomWidth: .2,
    borderRadius: 5,
    alignSelf: 'center',
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: .2,
    padding: 5,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    marginBottom: 10,
    height: 180,
  },
  textFont: {
    fontFamily: 'Palatino'
  },
  error: {
    fontSize: 15,
    color: 'red',
    marginLeft: '5%'
  }
});
