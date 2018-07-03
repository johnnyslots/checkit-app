import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, ListItem, Button, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchPendingRecs } from '../redux/pendingRecs';
import { fetchOpenRequests } from '../redux/openRequests';

class Profile extends React.Component {

  render() {

    const { fetchPending, fetchRequests, user, navigation } = this.props

    return (
      <View >
        <Button
          backgroundColor='#03A9F4'
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title='Pending Recommendations'
          onPress={() => fetchPending(user.id, navigation)}
        />
        <Button
          backgroundColor='red'
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          title='Open Requests'
          onPress={() => fetchRequests(user.id, navigation)}
        />
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#008242',
    width: '85%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 4
  },
  buttonText: {
    fontFamily: 'Palatino'
  }
});
