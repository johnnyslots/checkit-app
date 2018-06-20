import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { updateFriendRequest } from '../redux/pendingFriends';

class PendingFriends extends React.Component {
  render() {

    const { pendingFriends, updateFriendRequest } = this.props;

    return (
      <ScrollView>
        <Text>PENDING FRIENDS</Text>
        {
          pendingFriends.map(pending => {
            return (
              <View key={pending.id}>
                <TimeAgo time={pending.createdAt} />
                <Text>{pending.friend.fullName}</Text>
                  <Button
                    title='Accept'
                    onPress={() => updateFriendRequest(pending.id, pendingFriends)}
                  />
                  <Button
                    title='Ignore'
                    onPress={() => null}
                  />
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  pendingFriends: state.pendingFriends
})

const mapDispatchToProps = dispatch => ({
  updateFriendRequest: (requestId, allPendingRequests) => dispatch(updateFriendRequest(requestId, allPendingRequests))
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingFriends)
