import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socket from '../socket';
import AwesomeAlert from 'react-native-awesome-alerts';
import { connect } from 'react-redux';
import { fetchPendingRecs } from '../redux/pendingRecs';
import { fetchOpenRequests } from '../redux/openRequests';
import { fetchPendingFriends } from '../redux/pendingFriends';

class NewRecAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAlert: false,
      socketData: {},
      type: ''
    }
    this.handleSocket = this.handleSocket.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.handleIncomingRecConfirmation = this.handleIncomingRecConfirmation.bind(this);
  }

  componentDidMount() {
    this.handleSocket()
  }

  handleSocket() {
    socket.on('newRecRequest', (socketData) => {
      if(socketData.email.toLowerCase() === this.props.user.email) {
        this.setState({socketData, displayAlert: true, type: 'newRecRequest' })
      }
    })
    socket.on('newRec', (socketData) => {
      if(socketData.email.toLowerCase() === this.props.user.email) {
        this.setState({socketData, displayAlert: true, type: 'newRec'})
      }
    })
    socket.on('friendRequest', (socketData) => {
      if(socketData.userId === this.props.user.id) {
        this.setState({socketData, displayAlert: true, type: 'friendRequest'})
      }
    })
  }

  hideAlert = () => {
    this.setState({
      displayAlert: false,
      type: ''
    });
  };

  handleIncomingRecConfirmation() {
    const { fetchPending, fetchRequests, fetchPendingFriends, user, nav } = this.props
    const { type } = this.state
    if(type === 'newRecRequest') fetchRequests(user.id)
    else if(type === 'newRec') fetchPending(user.id)
    else if(type === 'friendRequest') fetchPendingFriends(user.id)
    nav(type);
    this.hideAlert();
  }

  render() {
    const { displayAlert, type } = this.state;
    const fullName = this.state.socketData.sender ? this.state.socketData.sender.fullName : null;
    let alert
    if(type === 'newRecRequest') alert = `You received a new request from ${fullName}!`
    else if(type === 'newRec') alert = `You received a new recommendation from ${fullName}!`
    else if(type === 'friendRequest') alert = `You received a new friend request!`

    if(displayAlert) {
      return (
        <View style={styles.container}>
          <AwesomeAlert
            show={displayAlert}
            showProgress={false}
            title={alert}
            message="Do you want to see more details?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Not now"
            confirmText="More details"
            confirmButtonColor="#aaa"
            cancelButtonColor='#aaa'
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.handleIncomingRecConfirmation();
            }}
          />
        </View>
      )
    }

    else return null
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  fetchPending: (userId, navigation) => {
    dispatch(fetchPendingRecs(userId, navigation))
  },
  fetchRequests: (userId, navigation) => {
    dispatch(fetchOpenRequests(userId, navigation))
  },
  fetchPendingFriends: (userId, navigation) => {
    dispatch(fetchPendingFriends(userId, navigation))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRecAlert)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});


