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
import OpenRequests from './screens/OpenRequests';
import FulfillRequest from './screens/FulfillRequest';
import PendingFriends from './screens/PendingFriends';
import SearchAcceptedFriends from './screens/SearchAcceptedFriends';

const headerTitleStyle = {fontFamily: 'Palatino'}

export const SignedOut = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerTitleStyle
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'Sign Up',
      headerTitleStyle
    }
  }
});

const Lists = StackNavigator({
  MyLists: {
    screen: MyLists,
    navigationOptions: {
      title: 'Home',
      headerTitleStyle,
    }
  },
  PendingRecs: {
    screen: PendingRecs,
    navigationOptions: {
      title: 'Pending',
      headerTitleStyle
    }
  },
  OpenRequests: {
    screen: OpenRequests,
    navigationOptions: {
      title: 'Open Requests',
      headerTitleStyle
    }
  },
  FulfillRequest: {
    screen: FulfillRequest,
    navigationOptions: {
      title: 'Send Recommendation',
      headerTitleStyle
    }
  },
  ListByCategory: {
    screen: ListByCategory,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.category}`,
      headerTitleStyle
    })
  },
  RecDetails: {
    screen: RecDetails,
    navigationOptions: {
      title: 'More Details',
      headerTitleStyle
    }
  }
})

const NewRecStack = StackNavigator({
  SearchAcceptedFriends: {
    screen: SearchAcceptedFriends,
    navigationOptions: {
      title: 'New Recommendation',
      headerTitleStyle
    }
  },
  NewRec: {
    screen: NewRec,
    navigationOptions: {
      title: 'New Recommendation',
      headerTitleStyle
    }
  }
})

const FindFriendsStack = StackNavigator({
  FindFriends: {
    screen: FindFriends,
    navigationOptions: {
      title: 'Find Users',
      headerTitleStyle
    }
  },
  PendingFriends: {
    screen: PendingFriends,
    navigationOptions: {
      title: 'Friend Requests',
      headerTitleStyle
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
      screen: FindFriendsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="search" size={30} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#008242',
      inactiveTintColor: '#646360',
      labelStyle: {
        fontSize: 12
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
        //changed screen from SignedOut to SignedIn for dev
        screen: SignedIn,
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

