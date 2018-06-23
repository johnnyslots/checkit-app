import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { updatePendingRec, deletePendingRec } from '../redux/pendingRecs';

class PendingRecs extends React.Component {
  render() {

    const { pendingRecs, acceptRec, deleteRec } = this.props;

    return (

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
                    onPress={() => acceptRec(rec.id, pendingRecs)}
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
