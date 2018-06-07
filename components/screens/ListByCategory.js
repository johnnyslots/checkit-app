import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AddOwnRec from './AddOwnRec';

class ListByCategory extends React.Component {
  render() {

    const recs = this.props.recs;
    const category = this.props.navigation.state.params.category;
    const userId = this.props.userId;

    return (
      <View style={styles.container}>
        <Text>{category}</Text>
        <AddOwnRec category={category} />
        <List>
          {
            recs.map(rec => {
              return (
                <View key={rec.id}>
                  <ListItem title={rec.item.title} />
                </View>
              )
            })
          }
        </List>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    recs: state.listByCategory,
    userId: state.currentUser.id
  }
}

export default connect(mapStateToProps, null)(ListByCategory)

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
