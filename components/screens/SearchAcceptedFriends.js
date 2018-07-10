import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SearchBar, Icon, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchFilteredFriends, fetchAllFriends } from '../redux/acceptedFriends';

class SearchAcceptedFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
    this.setSearchValue = this.setSearchValue.bind(this);
    this.clearSearchValue = this.clearSearchValue.bind(this);
    this.handleFriendSelection = this.handleFriendSelection.bind(this);
  }

  componentDidMount() {
    const { fetchAllFriends, currentUser } = this.props
    fetchAllFriends(currentUser.id)
  }

  setSearchValue(input) {
    const { fetchFilteredFriends, fetchAllFriends, currentUser } = this.props
    if(!input) {
      fetchAllFriends(currentUser.id)
    }
    else {
      this.setState({searchValue: input})
      fetchFilteredFriends(input, currentUser.id)
    }
  }

  clearSearchValue() {
    this.setState({searchValue: ''})
    const { fetchAllFriends, currentUser } = this.props
    fetchAllFriends(currentUser.id)
  }

  handleFriendSelection(friend) {
    this.props.navigation.navigate('NewRec', {friend})
  }

  render() {
    const { friends, currentUser } = this.props
    const { searchValue } = this.state

    return (
      <ScrollView style={styles.container}>
        <SearchBar
          onChangeText={(input) => this.setSearchValue(input)}
          onClearText={() => this.clearSearchValue()}
          clearIcon
          icon={{ type: 'font-awesome', name: 'search' }}
          value={searchValue}
          placeholder='Search'
        />
        <List>
        {
          friends.map(friend => {
            return (
              <View key={friend.id}>
                <ListItem
                  title={friend.fullName}
                  titleStyle={styles.textFont}
                  leftIcon={{
                    name: 'user',
                    type: 'font-awesome'
                  }}
                  rightIcon={
                    <Icon
                      name='send'
                      size={20}
                      onPress={() => this.handleFriendSelection(friend)}
                      color='#008242'
                    />
                  }
                />
              </View>
            )
          })
        }
        </List>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  friends: state.acceptedFriends
})

const mapDispatchToProps = dispatch => ({
  fetchFilteredFriends: (input, currentUserId) => dispatch(fetchFilteredFriends(input, currentUserId)),
  fetchAllFriends: (currentUserId) => dispatch(fetchAllFriends(currentUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAcceptedFriends)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textFont: {
    fontFamily: 'Palatino'
  }
})
