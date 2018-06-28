import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import TimeAgo from 'react-native-timeago';
import { updatePendingRec, deletePendingRec } from '../redux/pendingRecs';

class PendingRecs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNotification: false
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
      <View>
        <ScrollView>
          {
            pendingRecs.length ?
            pendingRecs.map(rec => {
              return (
                <View key={rec.id}>
                  <Text>{rec.item.title}</Text>
                  <Text>Recommended by {rec.from.fullName}</Text>
                  <TimeAgo time={rec.createdAt} />

                  {
                    rec.notes
                    ? <Text>Notes: {rec.notes}</Text>
                    : null
                  }

                  <Button
                    title={`Add to ${rec.item.category} list`}
                    onPress={() => this.handleAddRecPress(rec.id, pendingRecs)}
                  />
                  <Button
                    title="Dismiss this recommendation"
                    onPress={() => deleteRec(rec.id, pendingRecs)}
                  />
                </View>
              )
            })
            :
            <View>
              <Text>You have no pending recommendations!</Text>
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
