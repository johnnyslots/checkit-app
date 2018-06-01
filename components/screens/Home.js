import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import { logout } from '../redux/auth';

class Home extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <Text>My Lists</Text>
        <Button
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Books', {user})} title="Books"/>
        <Button
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Movies')} title="Movies"/>
        <Button
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Podcasts')} title="Podcasts"/>
        <Button
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('TVShows')} title="TV Shows"/>
        <Button
          buttonStyle={styles.button}
          title="Logout"
          onPress={() => this.props.logout(this.props.navigation)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: (navigation) => dispatch(logout(navigation))
});

export default connect(null, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
