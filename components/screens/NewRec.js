import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class NewRec extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>New Rec</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
