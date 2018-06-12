import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';

export default class RequestRec extends React.Component {
  render() {
    return (
      <View>
        <Text>REQUEST REC</Text>
          <Dropdown
            label='Category'
            // data={categories}
            // containerStyle={sendRecStyles.input}
            // onChangeText={this.handleCategoryChange}
          />
          <TextField
            // containerStyle={sendRecStyles.input}
            // onChangeText={this.handleEmailChange}
            // value={this.state.email}
            label="Send to (email)"
          />
          {/*
            this.state.incorrectEmail ?
            <Text>User doesn't exist</Text>
            : null
          */}
          <TextField
            // containerStyle={sendRecStyles.input}
            // onChangeText={this.handleTitleChange}
            // value={this.state.title}
            label="Title"
          />
          <TextField
            // containerStyle={sendRecStyles.input}
            // onChangeText={this.handleNotesChange}
            // value={this.state.notes}
            label="Notes"
          />
      </View>
    )
  }
}
