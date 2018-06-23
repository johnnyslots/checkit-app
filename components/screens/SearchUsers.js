import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SearchBar, List, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/searchUsers';
import axios from 'axios';
import IP from '../../secrets';
import socket from '../socket';

class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingOrRejected: [],
      accepted: []
    }
    this.addUser = this.addUser.bind(this);
  }

  addUser(userId) {
    const currentUserId = this.props.currentUser.id
    axios.post(`${IP}/api/friends/requests`, {userId, currentUserId})
    .then(res => res.data)
    .then(friendStatus => {
      if(friendStatus.status === 'pending' || friendStatus.status === 'rejected') {
        socket.emit('friendRequest', {userId});
        this.setState({pendingOrRejected: [...this.state.pendingOrRejected, friendStatus.friendId]})
      }
      else if(friendStatus.status === 'accepted') {
        this.setState({accepted: [...this.state.accepted, friendStatus.friendId]})
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    const { fetchUsers, users, currentUser } = this.props
    const { pendingOrRejected, accepted } = this.state

    return (
      <View>
        <SearchBar
          onChangeText={(input) => fetchUsers(input, currentUser.id)}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Search for friends...'
        />
        {
          users.length ?
          <List>
            {
              users.map(user => {
                let iconName
                let onPressFunc
                if(pendingOrRejected.indexOf(user.id) > -1) {
                  iconName = 'access-time'
                  onPressFunc = null
                }
                else if(accepted.indexOf(user.id) > -1) {
                  iconName = 'check'
                  onPressFunc = null
                }
                else {
                  iconName = 'add'
                  onPressFunc = (userId) => this.addUser(userId)
                }
                return (
                  <View key={user.id}>
                    <ListItem
                      title={user.fullName}
                      rightIcon={
                        <Icon
                          name={iconName}
                          size={20}
                          onPress={() => onPressFunc(user.id)}
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
  currentUser: state.currentUser,
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: (input, currentUserId) => dispatch(fetchUsers(input, currentUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers)
