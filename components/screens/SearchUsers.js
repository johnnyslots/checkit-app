import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SearchBar, List, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/searchUsers';

class SearchUsers extends React.Component {
  render() {
    const { fetchUsers, users } = this.props

    return (
      <View>
        <SearchBar
          onChangeText={(input) => fetchUsers(input)}
          // onClearText={someMethod}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Search for friends by email...'
        />
        {
          users.length ?
          <List>
            {
              users.map(user => {
                return (
                  <View key={user.id}>
                    <ListItem
                      title={user.fullName}
                      rightIcon={
                        <Icon
                          name={'add'}
                          size={20}
                          onPress={() => console.log('Pressed !')}
                        />
                      }
                    />
                  </View>
                )
              })
            }
          </List>
          : null
        }
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

