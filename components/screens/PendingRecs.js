import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { getRecommendedAtDate } from '../utils';
import { updatePendingRec } from '../redux/pendingRecs';

class PendingRecs extends React.Component {
  render() {

    const { pendingRecs, acceptRec } = this.props;

    return (
      <View>
          {
            pendingRecs.length ?
            pendingRecs.map(rec => {
              const recommendedAt = getRecommendedAtDate(rec.createdAt)
              return (
                <View key={rec.id}>
                  <Text>{rec.item.title}</Text>
                  <Text>Recommended by {rec.from.fullName} on {recommendedAt}</Text>
                  <Text>Notes: {rec.notes}</Text>
                  <Button
                    title={`Add to ${rec.item.category} list`}
                    onPress={() => acceptRec(rec.id, pendingRecs)}
                  />
                  <Button
                    title="Dismiss this recommendation"
                    onPress={() => console.log('DISMISS')}
                  />
                </View>
              )
            })
            :
            <View>
              <Text>You have no pending recommendations!</Text>
            </View>
          }


      </View>
    )
  }
}

const mapStateToProps = state => ({
  pendingRecs: state.pendingRecs
})

const mapDispatchToProps = dispatch => ({
  acceptRec: (recId, allPendingrecs) => dispatch(updatePendingRec(recId, allPendingrecs))
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingRecs)
