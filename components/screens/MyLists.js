import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, ListItem } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { logout } from '../redux/auth';
import { fetchListByCategory } from '../redux/listByCategory';
import Profile from './Profile';

class MyLists extends React.Component {
  render() {

    const { user } = this.props;
    const navigation = this.props.navigation;
    const categories = ['Books', 'Movies', 'Podcasts', 'TV Shows'];
    const icons = {
      books: {
        name: 'book',
        type: 'font-awesome'
      },
      movies: {
        name: 'movie'
      },
      tvshows: {
        name: 'tv'
      },
      podcasts: {
        name: 'podcast',
        type: 'font-awesome'
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.userNameContainer}>
          <Text h3 style={styles.userName}>{user.fullName}</Text>
        </View>
        <View style={styles.yourListsContainer}>
          {
            categories.map((category, i) => {
              const iconCategory = category.split(' ').join('').toLowerCase()
              const type = icons[iconCategory].type ? icons[iconCategory].type : null
              return (
                  <ListItem
                    key={i}
                    titleStyle={styles.listItemTitle}
                    containerStyle={styles.listItemContainer}
                    onPress={() => this.props.fetchList(category, user.id, navigation)}
                    title={category}
                    leftIcon={{
                      name: icons[iconCategory].name,
                      type: type
                    }}
                  />
              )
            })
          }
        </View>
        <View style={styles.logoutContainer}>
        <Profile navigation={navigation}/>
          <Button
            buttonStyle={[styles.button, styles.logoutButton]}
            title="Logout"
            onPress={() => this.props.logout(navigation)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  logout: (navigation) => dispatch(logout(navigation)),
  fetchList: (category, userId, navigation) => dispatch(fetchListByCategory(category, userId, navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyLists);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  userNameContainer: {
    borderBottomWidth: .2,
    borderBottomColor: '#646360',
    margin: 15,
    marginTop: 15
  },
  userName: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    color: 'black'
  },
  yourListsContainer: {
    marginBottom: 20
  },
  button: {
    backgroundColor: '#008242',
    width: '85%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 4
  },
  listItemTitle: {

    marginLeft: 10
  },
  listItemContainer: {
    paddingLeft: 10
  },
  logoutContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 25
  },
  logoutButton: {
    backgroundColor: '#646360',
  }
});
