import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import SendRec from './SendRec';
import RequestRec from './RequestRec';

export default class NewRec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex() {
    let selectedIndex = this.state.selectedIndex ? 0 : 1
    this.setState({selectedIndex})
  }

  render() {

    const buttons = ['Send', 'Request']
    const { selectedIndex } = this.state
    const { friend } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={() =>  this.updateIndex()}
          buttons={buttons}
          selectedIndex={selectedIndex}
          containerStyle={{backgroundColor: 'green'}}
        />
        {
          selectedIndex ? <SendRec friend={friend} /> : <RequestRec friend={friend} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
