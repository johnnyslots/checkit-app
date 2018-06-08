import React from 'react';
import { View, Text, Linking } from 'react-native';
import months from '../utils';

export default class RecDetails extends React.Component {
  render() {
    const recDetails = this.props.navigation.state.params.rec;
    const recommender = recDetails.from ? recDetails.from : 'me';
    const url = recDetails.item.findOnGoogle
    const dateSplit = recDetails.createdAt.slice(0, 10).split('-');
    console.log('DATE', dateSplit, months)
    const recommendedAt = `${months[dateSplit[1]]} ${dateSplit[2]}, ${dateSplit[0]}`;

    return(
      <View>
        <Text>{recDetails.item.title}</Text>
        <Text>Recommended by {recommender} on </Text>
        <Text>Notes: {recDetails.notes}</Text>
        <Text onPress={() => Linking.openURL(url)}>Find it on Google</Text>
      </View>
    )
  }
}
