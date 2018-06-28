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
        <Card title={user.fullName}>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 1}}
            title='Pending Recommendations'
            onPress={() => fetchPending(user.id, navigation)} />
          />
          <Button
            backgroundColor='red'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 1, marginTop: 1}}
            title='Open Requests'
            onPress={() => fetchRequests(user.id, navigation)} />
          />
        </Card>
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
