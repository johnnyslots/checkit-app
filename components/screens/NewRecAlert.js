import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socket from '../socket';
import AwesomeAlert from 'react-native-awesome-alerts';
import { connect } from 'react-redux';
import { fetchPendingRecs } from '../redux/pendingRecs';
import { fetchOpenRequests } from '../redux/openRequests';

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
        this.setState({socketData, displayAlert: true, type: 'request' })
      }
    })
    socket.on('newRec', (socketData) => {
      if(socketData.email.toLowerCase() === this.props.user.email) {
        this.setState({socketData, displayAlert: true})
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
    const { fetchPending, fetchRequests, user, nav } = this.props
    const requestType = this.state.type ? 'request' : null
    if(requestType) {
      fetchRequests(user.id)
      // nav('request')
    }
    else {
      fetchPending(user.id)
      // nav()
    }
    nav(requestType);
    this.hideAlert();
  }

  render() {
    const { displayAlert, type } = this.state;
    const fullName = this.state.socketData.sender ? this.state.socketData.sender.fullName : null;
    const alert = type === 'request' ?
    `You received a new request from ${fullName}!`
    : `You received a new recommendation from ${fullName}!`;

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


