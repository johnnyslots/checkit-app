import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
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
        <FormLabel>Add {category}</FormLabel>
        <FormInput
          // inputStyle={booksStyles.addBookInput}
          onChangeText={this.handleTitleChange}
          value={this.state.title}
          placeholder="Title"
        />
        <FormInput
          // inputStyle={booksStyles.addBookInput}
          onChangeText={this.handleNotesChange}
          value={this.state.notes}
          placeholder="Notes"
        />
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
  button: {
    backgroundColor: '#2C4E91',
    // margin: '3%',
    // justifyContent: 'center',
    // borderRadius: 10,
    // height: 20,
    // paddingBottom: '10%'
  }
})
