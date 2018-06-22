import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { updateFriendRequest, dismissRequest } from '../redux/pendingFriends';

class PendingFriends extends React.Component {
  render() {

    const { pendingFriends, updateFriendRequest, dismissRequest } = this.props;

    return (
      <ScrollView>
        {
          pendingFriends.length ?
          pendingFriends.map(pending => {
            return (
              <View key={pending.id}>
                <TimeAgo time={pending.createdAt} />
                <Text>{pending.user.fullName}</Text>
                  <Button
                    title='Accept'
                    onPress={() => updateFriendRequest(pending.id, pendingFriends)}
                  />
                  <Button
                    title='Ignore'
                    onPress={() => dismissRequest(pending.id, pendingFriends)}
                  />
              </View>
            )
          })
          :
          <View>
            <Text>You have no pending friend requests</Text>
          </View>
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  pendingFriends: state.pendingFriends
})

const mapDispatchToProps = dispatch => ({
  updateFriendRequest: (requestId, allPendingRequests) => dispatch(updateFriendRequest(requestId, allPendingRequests)),
  dismissRequest: (requestId, allPendingRequests) => dispatch(dismissRequest(requestId, allPendingRequests))
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingFriends)
