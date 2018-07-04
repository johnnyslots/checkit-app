import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { getRecommendedAtDate } from '../utils';

export default class RecDetails extends React.Component {
  render() {
    const recDetails = this.props.navigation.state.params.rec;
    const recommender = recDetails.from ? `Recommended by ${recDetails.from.fullName}` : 'You added this';
    const url = recDetails.item.findOnGoogle
    const recommendedAt = getRecommendedAtDate(recDetails.createdAt)

    return(
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text h4 style={[styles.categoryTitle, styles.textFont]}>{recDetails.item.title}</Text>
        </View>
        <Text h5 style={styles.detailsText}>{recommender} on {recommendedAt}</Text>
        {
          recDetails.notes ?
          <Text h5 style={styles.detailsText}>Notes: {recDetails.notes}</Text>
          : null
        }
        <Button
          onPress={() => Linking.openURL(url)}
          buttonStyle={styles.button}
          textStyle={styles.textFont}
          title='Find it on Google'
          rightIcon={{name: 'google', type: 'zocial'}}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    borderBottomWidth: .2,
    borderBottomColor: '#646360',
    margin: 15
  },
  categoryTitle: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    color: 'black'
  },
  detailsText: {
    alignSelf: 'center',
    margin: 10
  },
  button: {
    backgroundColor: '#008242',
    width: '85%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 4,
    marginTop: 10
  },
  buttonText: {
    fontFamily: 'Palatino'
  },
  textFont: {
    fontFamily: 'Palatino'
  }
})
