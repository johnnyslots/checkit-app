import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchFriends } from '../redux/acceptedFriends';

class SearchAcceptedFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
    this.setSearchValue = this.setSearchValue.bind(this);
    this.clearSearchValue = this.clearSearchValue.bind(this);
  }

  setSearchValue(input) {
    const { fetchFriends, currentUser } = this.props
    this.setState({searchValue: input})
    fetchFriends(input, currentUser.id)
  }

  clearSearchValue() {
    this.setState({searchValue: ''})
  }

  render() {
    const { fetchFriends, users, currentUser } = this.props
    const { searchValue } = this.state

    return (
      <View>
        <SearchBar
          onChangeText={(input) => this.setSearchValue(input)}
          onClearText={() => this.clearSearchValue()}
          clearIcon
          icon={{ type: 'font-awesome', name: 'search' }}
          value={searchValue}
          placeholder='Search'
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  fetchFriends: (input, currentUserId) => dispatch(fetchFriends(input, currentUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAcceptedFriends)
