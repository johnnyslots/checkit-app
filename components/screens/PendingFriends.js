import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { updateFriendRequest, dismissRequest } from '../redux/pendingFriends';

class PendingFriends extends React.Component {
  render() {

    const { pendingFriends, updateFriendRequest, dismissRequest } = this.props;

    return (
      <ScrollView style={styles.container}>
        {
          pendingFriends.length ?
          pendingFriends.map(pending => {
            return (
              <Card key={pending.id}>
                <Text style={[styles.textFont, styles.fullName]}>{pending.user.fullName}</Text>
                <TimeAgo time={pending.createdAt} style={[styles.textFont, styles.time]} />
                <View style={styles.iconContainer}>
                  <Icon
                    raised
                    reverse
                    iconStyle={styles.icon}
                    color='#008242'
                    name='plus'
                    type='font-awesome'
                    onPress={() => updateFriendRequest(pending.id, pendingFriends)}
                  />
                  <Icon
                    raised
                    reverse
                    iconStyle={styles.icon}
                    color='red'
                    name='remove'
                    type='font-awesome'
                    onPress={() => dismissRequest(pending.id, pendingFriends)}
                  />
                </View>
              </Card>
            )
          })
          :
          <View>
            <Text style={[styles.textFont, styles.noPending]}>You have no pending friend requests!</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 5,
  },
  fullName: {
    fontSize: 18,
    alignSelf: 'center'
  },
  time: {
    alignSelf: 'center'
  },
  noPending: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: '10%'
  },
  textFont: {
    fontFamily: 'Palatino',
    margin: 1
  }
});
