import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AddOwnRec from './AddOwnRec';

class ListByCategory extends React.Component {
  render() {

    const recs = this.props.recs;
    const category = this.props.navigation.state.params.category;
    const userId = this.props.userId;

    return (
      <View style={styles.container}>
        <Text h4>{category}</Text>
        <AddOwnRec category={category} />
        <List>
          {
            recs.map(rec => {
              return (
                <View key={rec.id}>
                  <ListItem
                    title={rec.item.title}
                    onPress={() => this.props.navigation.navigate('RecDetails', {rec})}
                  />
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
    flex: 1,
    backgroundColor: 'white'
  },
});
