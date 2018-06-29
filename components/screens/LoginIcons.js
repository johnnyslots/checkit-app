import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon as ElementsIcon, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginIcons = () => {
  return (
    <View style={styles.container}>
      <ElementsIcon
        name='movie'
        size={40}
        iconStyle={styles.icon}
      />
      <Icon
        name='book'
        size={40}
        style={styles.icon}
      />
      <ElementsIcon
        name='tv'
        size={40}
        iconStyle={styles.icon}
      />
      <Icon
        name='podcast'
        size={40}
        style={styles.icon}
      />
    </View>
  )
}

const styles = {
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 15
  },
  icon: {
    margin: 10
  }
}

export default LoginIcons
