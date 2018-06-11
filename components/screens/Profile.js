import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, ListItem, Button, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchPendingRecs } from '../redux/pendingRecs'


class Profile extends React.Component {

  render() {

    const { fetchPending, userId, navigation } = this.props

    return (
      <View >
        <Card title='Cody Smith'>
          <Avatar
            medium
            rounded
            source={{uri: "https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg"}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{marginLeft: '40%', marginBottom: 20, marginTop: 10}}
          />
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Pending Recommendations'
            onPress={() => fetchPending(userId, navigation)} />
          />
        </Card>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPending: (userId, navigation) => {
    dispatch(fetchPendingRecs(userId, navigation))
  }
})

export default connect(null, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
