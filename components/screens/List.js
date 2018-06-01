import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class List extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Books</Text>
      </View>
    )
  }
}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
