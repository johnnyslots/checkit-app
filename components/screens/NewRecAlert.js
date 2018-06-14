import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socket from '../socket';
import AwesomeAlert from 'react-native-awesome-alerts';
import { connect } from 'react-redux';
import { fetchPendingRecs } from '../redux/pendingRecs';

class NewRecAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAlert: false,
      socketData: {}
    }
    this.handleSocket = this.handleSocket.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.handleIncomingRecConfirmation = this.handleIncomingRecConfirmation.bind(this);
  }

  componentDidMount() {
    this.handleSocket()
  }

  handleSocket() {
    socket.on('newRec', (socketData) => {
      if(socketData.email.toLowerCase() === this.props.user.email) {
        this.setState({socketData, displayAlert: true})
      }
    })
  }

  hideAlert = () => {
    this.setState({
      displayAlert: false
    });
  };

  handleIncomingRecConfirmation() {
    const { fetchPending, user, nav } = this.props
    fetchPending(user.id)
    nav()
    this.hideAlert();
  }

  render() {
    const { displayAlert } = this.state;
    const fullName = this.state.socketData.sender ? this.state.socketData.sender.fullName : null;
    const newRecAlert = `You received a new recommendation from ${fullName}!`;

    if(displayAlert) {
      return (
        <View style={styles.container}>
          <AwesomeAlert
            show={displayAlert}
            showProgress={false}
            title={newRecAlert}
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


