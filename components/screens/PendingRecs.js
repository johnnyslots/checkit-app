import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import TimeAgo from 'react-native-timeago';
import { updatePendingRec, deletePendingRec } from '../redux/pendingRecs';

class PendingRecs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNotification: false,
      test: true
    }
    this.handleAddRecPress = this.handleAddRecPress.bind(this)
  }

  handleAddRecPress(recId, pendingRecs) {
    const { acceptRec } = this.props
    acceptRec(recId, pendingRecs)
    .then(() => {
      this.setState({displayNotification: true})
      setTimeout(() => {this.setState({displayNotification: false})}, 1500)
    })
    .catch(err => console.log(err))
  }

  render() {
    const { pendingRecs, deleteRec } = this.props;
    const checkmark = '\u2714'

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            pendingRecs.length ?
            pendingRecs.map(rec => {
              return (
                <Card key={rec.id} title={rec.item.title} style={styles.cardContainer} titleStyle={styles.textFont}>
                  <Text style={styles.textFont}>Recommended by {rec.from.fullName}</Text>
                  <TimeAgo style={styles.textFont} time={rec.createdAt} />
                  {
                    rec.notes
                    ? <Text style={styles.textFont}>Notes: {rec.notes}</Text>
                    : null
                  }
                  <View style={styles.iconContainer}>
                    <Icon
                      raised
                      reverse
                      iconStyle={styles.icon}
                      color='#008242'
                      name='plus'
                      type='font-awesome'
                      onPress={() => this.handleAddRecPress(rec.id, pendingRecs)}
                    />
                    <Icon
                      raised
                      reverse
                      iconStyle={styles.icon}
                      color='red'
                      name='remove'
                      type='font-awesome'
                      onPress={() => deleteRec(rec.id, pendingRecs)}
                    />
                  </View>
                </Card>
              )
            })
            :
            <View>
              <Text style={[styles.textFont, styles.noPending]}>You have no pending recommendations!</Text>
            </View>
          }
        </ScrollView>
        <AwesomeAlert
          show={this.state.displayNotification}
          showProgress={false}
          title='Added!'
          message={checkmark}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  pendingRecs: state.pendingRecs
})

const mapDispatchToProps = dispatch => ({
  acceptRec: (recId, allPendingrecs) => dispatch(updatePendingRec(recId, allPendingrecs)),
  deleteRec: (recId, allPendingrecs) => dispatch(deletePendingRec(recId, allPendingrecs))
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingRecs)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  cardContainer: {
    flex: 1
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 5,
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
