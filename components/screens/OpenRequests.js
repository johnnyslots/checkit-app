import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';
import { connect } from 'react-redux';

class OpenRequests extends React.Component {
  render() {

    const { openRequests, navigation } = this.props
    console.log('navigation???', navigation)

    return (
      <ScrollView>
        <Text>OPEN REQUESTS</Text>
        {
          openRequests.map(request => {
            return (
              <View key={request.id}>
                <TimeAgo time={request.createdAt} />
                <Text>From: {request.from.fullName}</Text>
                <Text>Category: {request.category}</Text>
                <Text>{request.message}</Text>
                <Button
                title='Send Recommendation'
                backgroundColor='#03A9D1'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                onPress={() => navigation.navigate('NewRec')}
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
  openRequests: state.openRequests
})

export default connect(mapStateToProps)(OpenRequests)
