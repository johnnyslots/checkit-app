import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';

class PendingFriends extends React.Component {
  render() {

    const { pendingFriends } = this.props;

    return (
      <ScrollView>
        <Text>PENDING FRIENDS</Text>
        {
          pendingFriends.map(pending => {
            return (
              <View key={pending.id}>
                <Text>{pending.friend.fullName}</Text>
                <Text>{pending.friend.email}</Text>
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

export default connect(mapStateToProps)(PendingFriends)
