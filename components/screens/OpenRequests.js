import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';
import { connect } from 'react-redux';

class OpenRequests extends React.Component {
  render() {

    const { openRequests, navigation } = this.props

    return (
      <ScrollView style={styles.container}>
        {
          openRequests.length ?
          openRequests.map(request => {
            return (
              <Card key={request.id}>
                <View style={styles.cardHeaderContainer}>
                  <Text style={styles.cardHeader}>{request.from.fullName}</Text>
                  <TimeAgo time={request.createdAt} style={styles.cardHeader} />
                </View>
                <Text>Category: {request.category}</Text>
                <Text style={styles.cardMessage}>Message: {request.message}</Text>
                <Button
                title='Send Recommendation'
                backgroundColor='#03A9D1'
                buttonStyle={styles.button}
                textStyle={styles.textFont}
                onPress={() => navigation.navigate('FulfillRequest', {request})}
                rightIcon={{name: 'send', type: 'material-icon'}}
                />
              </Card>
            )
          })
          :
          <View>
            <Text>You have no open requests!</Text>
          </View>
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  openRequests: state.openRequests
})

export default connect(mapStateToProps)(OpenRequests)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardMessage: {
    marginTop: 12,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#008242',
    width: '110%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    // margin: 4
  },
  textFont: {
    fontFamily: 'Palatino'
  }
})
