import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import SearchUsers from './SearchUsers';
import { fetchPendingFriends } from '../redux/pendingFriends';

class FindFriends extends React.Component {
  render() {

    const { userId, fetchPendingFriends, navigation } = this.props;

    return (
      <View style={styles.container}>
        <SearchUsers />
        <Button
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 1, marginTop: 1}}
          title='Pending Friend Requests'
          onPress={() => fetchPendingFriends(userId, navigation)} />
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.currentUser.id
})

const mapDispatchToProps = dispatch => ({
  fetchPendingFriends: (userId, navigation) => {
    dispatch(fetchPendingFriends(userId, navigation))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends)

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
