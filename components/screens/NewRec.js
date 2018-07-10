import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
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
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.buttonsContainer}>
          <ButtonGroup
            onPress={() =>  this.updateIndex()}
            buttons={buttons}
            selectedIndex={selectedIndex}
            containerStyle={styles.buttonGroupContainer}
            selectedTextStyle={[styles.selectedText, styles.textFont]}
            textStyle={[styles.textStyle, styles.textFont]}
          />
        </View>
        {
          selectedIndex ? <SendRec friend={friend} /> : <RequestRec friend={friend} />
        }
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonsContainer: {
    marginTop: '3%'
  },
  buttonGroupContainer: {
    backgroundColor: '#646360',
    width: '85%',
    alignSelf: 'center',
  },
  selectedText: {
    color: 'gray'
  },
  textStyle: {
    color: 'white'
  },
  textFont: {
    fontFamily: 'Palatino'
  }
});
