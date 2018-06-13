import React from 'react';
import {
  Notifications,
} from 'expo';
import {
  Text,
  View,
} from 'react-native';

// This refers to the function defined earlier in this guide
import registerForPushNotificationsAsync from './expoPushToken';

export default class PushNotification extends React.Component {
  state = {
    notification: {},
  };

  componentDidMount() {
    registerForPushNotificationsAsync();
    console.log('PUSH MOUNT')

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  render() {
    console.log('PUSH RENDER')
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>
    );
  }
}
