import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import IP from '../../secrets';
import axios from 'axios';
import { fetchListByCategory } from '../redux/listByCategory'


class AddOwnRec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      notes: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(title) {
    this.setState({title});
  }

  handleNotesChange(notes) {
    this.setState({notes});
  }

  handleSubmit() {
    const userId = this.props.userId;
    const category = this.props.category.split(' ').join(' ').toLowerCase();

    axios.post(`${IP}/api/recommendations/ownRec`, {item: this.state, userId, category})
    .then(() => {
      this.props.fetchList(category, userId);
      this.setState({title: '', notes: ''});
    })
    .catch(err => console.log(err))
  }

  render() {

    const category = this.props.category;

    return(
      <View>
        <Text h5 style={styles.formTitle}>Add {category}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleTitleChange}
          value={this.state.title}
          placeholder="Title"
        />
        <View style={styles.textAreaContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={this.handleNotesChange}
            value={this.state.notes}
            placeholder="Notes"
          />
        </View>
        <Button
          buttonStyle={styles.button}
          onPress={this.handleSubmit}
          title="Add to list"
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  userId: state.currentUser.id,
  category: ownProps.category
})

const mapDispatchToProps = dispatch => ({
  fetchList: (category, userId, navigation) => dispatch(fetchListByCategory(category, userId, navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOwnRec);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formTitle: {
    marginLeft: '10%',
    marginTop: 30,
    color: '#646360'
  },
  button: {
    backgroundColor: '#008242',
    width: '85%',
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 4
  },
  buttonText: {
    fontFamily: 'Palatino'
  },
  textInput: {
    height: 40,
    width: '80%',
    margin: 5,
    color: 'black',
    fontSize: 15,
    borderBottomWidth: .2,
    borderRadius: 5,
    alignSelf: 'center',
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: .2,
    padding: 5,
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 10,
    marginBottom: 10,
    height: 80,
  },
  buttonContainer: {
    marginTop: 5
  },
})
