import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import { logout } from '../redux/auth';
import { fetchListByCategory } from '../redux/listByCategory'

class Home extends React.Component {
  render() {

    const userId = this.props.userId
    const navigation = this.props.navigation

    return (
      <View style={styles.container}>
        <Text>My Lists</Text>
        <Button
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Books', {user})}
          title="Books"
        />
        <Button
          buttonStyle={styles.button}
          onPress={() => this.props.fetchList('movies', userId, navigation)}
          title="Movies"
        />
        <Button
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Podcasts')}
          title="Podcasts"
        />
        <Button
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('TVShows')}
          title="TV Shows"
        />
        <Button
          buttonStyle={styles.button}
          title="Logout"
          onPress={() => this.props.logout(navigation)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.currentUser.id
})

const mapDispatchToProps = dispatch => ({
  logout: (navigation) => dispatch(logout(navigation)),
  fetchList: (category, userId, navigation) => dispatch(fetchListByCategory(category, userId, navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
