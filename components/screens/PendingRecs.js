import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getRecommendedAtDate } from '../utils';

class PendingRecs extends React.Component {
  render() {

    const { pendingRecs } = this.props;

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

export default connect(mapStateToProps, null)(PendingRecs)
