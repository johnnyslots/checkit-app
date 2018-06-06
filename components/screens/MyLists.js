import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import { logout } from '../redux/auth';
import { fetchListByCategory } from '../redux/listByCategory'
import Profile from './Profile'

class MyLists extends React.Component {
  render() {

    const userId = this.props.userId
    const navigation = this.props.navigation
    const categories = ['Books', 'Movies', 'Podcasts', 'TV Shows']

    return (
      <View style={styles.container}>
      <Profile />
        <Text>My Lists</Text>
        {
          categories.map((category, i) => {
            const categoryForRoute = category.split(' ').join().toLowerCase()
            return (
              <Button
                key={i}
                buttonStyle={styles.button}
                onPress={() => this.props.fetchList(categoryForRoute, userId, navigation)}
                title={category}
              />
            )
          })
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(MyLists);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
