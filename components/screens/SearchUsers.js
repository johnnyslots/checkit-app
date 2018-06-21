import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/searchUsers';

class SearchUsers extends React.Component {
  render() {
    const { fetchUsers } = this.props

    return (
      <View>
        <Text>SEARCH</Text>
        <SearchBar
          onChangeText={(input) => fetchUsers(input)}
          // onClearText={someMethod}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Search for friends by email...'
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: (input) => dispatch(fetchUsers(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers)

