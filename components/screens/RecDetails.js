import React from 'react';
import { View, Text, Linking } from 'react-native';
import { getRecommendedAtDate } from '../utils';

export default class RecDetails extends React.Component {
  render() {
    const recDetails = this.props.navigation.state.params.rec;
    const recommender = recDetails.from ? recDetails.from.fullName : 'me';
    const url = recDetails.item.findOnGoogle
    const recommendedAt = getRecommendedAtDate(recDetails.createdAt)

    return(
      <View>
        <Text>{recDetails.item.title}</Text>
        <Text>Recommended by {recommender} on {recommendedAt}</Text>
        <Text>Notes: {recDetails.notes}</Text>
        <Text onPress={() => Linking.openURL(url)}>Find it on Google</Text>
      </View>
    )
  }
}
