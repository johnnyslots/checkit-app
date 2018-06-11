import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { months } from '../utils';

class PendingRecs extends React.Component {
  render() {

    const { pendingRecs } = this.props;


    return (
      <View>
        {
          pendingRecs.map(rec => {
            const dateSplit = rec.createdAt.slice(0, 10).split('-');
            const recommendedAt = `${months[dateSplit[1]]} ${dateSplit[2]}, ${dateSplit[0]}`;
            return (
              <View key={rec.id}>
                <Text>{rec.item.title}</Text>
                <Text>Recommended by {rec.from.fullName} on {recommendedAt}</Text>
                <Text>Notes: {rec.notes}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  pendingRecs: state.pendingRecs
})

export default connect(mapStateToProps, null)(PendingRecs)