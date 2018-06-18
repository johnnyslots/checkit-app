import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';

import Login from './screens/Login';
import Signup from './screens/Signup';
import MyLists from './screens/MyLists';
import ListByCategory from './screens/ListByCategory';
import NewRec from './screens/NewRec';
import FindFriends from './screens/FindFriends';
import RecDetails from './screens/RecDetails';
import PendingRecs from './screens/PendingRecs';
import OpenRequests from './screens/OpenRequests'

export const SignedOut = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'Sign Up'
    }
  }
});

const Lists = StackNavigator({
  MyLists: {
    screen: MyLists,
    navigationOptions: {
      title: 'Home'
    }
  },
  PendingRecs: {
    screen: PendingRecs,
    navigationOptions: {
      title: 'Pending'
    }
  },
  OpenRequests: {
    screen: OpenRequests,
    navigationOptions: {
      title: 'Open Requests'
    }
  },
  ListByCategory: {
    screen: ListByCategory,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.category}`
    })
  },
  RecDetails: {
    screen: RecDetails
  }
})

const NewRecStack = StackNavigator({
  NewRec: {
    screen: NewRec,
    navigationOptions: {
      title: 'New Recommendation'
    }
  }
})

export const SignedIn = TabNavigator(
  {
    MyLists: {
      screen: Lists,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="home" size={30} color={tintColor} />
      }
    },
    NewRec: {
      screen: NewRecStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="plus" size={30} color={tintColor} />,
      }
    },
    FindFriends: {
      screen: FindFriends,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="search" size={30} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 13
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};
