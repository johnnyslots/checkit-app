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
          buttonStyle={styles.button}
          textStyle={styles.textFont}
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
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#008242',
    width: '95%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 25,
  },
  textFont: {
    fontFamily: 'Palatino'
  },
});
