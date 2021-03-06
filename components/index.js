import React from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { createRootNavigator } from './router';
import { isSignedIn } from './auth';
import store from './store';
import NewRecAlert from './screens/NewRecAlert';
import { NavigationActions } from 'react-navigation';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
    this.nav = this.nav.bind(this);
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(error => console.error(error));
  }

  nav(type) {
    let screen
    if(type === 'newRecRequest') screen = 'OpenRequests'
    else if(type === 'newRec') screen = 'PendingRecs'
    else if(type === 'friendRequest') screen = 'PendingFriends'
    this.navigator && this.navigator.dispatch(
      NavigationActions.navigate({ routeName: screen }))
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return (
        <Provider store={store}>
          <React.Fragment>
            <Layout ref={nav => { this.navigator = nav }}/>
            <NewRecAlert nav={this.nav}/>
          </React.Fragment>
        </Provider>
    );
  }
}
