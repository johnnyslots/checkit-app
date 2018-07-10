import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
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
        <AddOwnRec category={category} />
        <ScrollView style={styles.listContainer}>
          {
            recs.length ?
            recs.map(rec => {
              return (
                <ListItem
                  key={rec.id}
                  titleStyle={[styles.listItemTitle, styles.textFont]}
                  containerStyle={styles.listItemContainer}
                  title={rec.item.title}
                  onPress={() => this.props.navigation.navigate('RecDetails', {rec})}
                  leftIcon={{
                    name: 'bookmark',
                    type: 'font-awesome',
                    color: '#E8631C'
                  }}
                />
              )
            })
            :
            <View style={styles.emptyListContainer}>
              <Text style={[styles.textFont, styles.emptyListText]}>Your list is currently empty</Text>
          </View>
          }
        </ScrollView>
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
  categoryTitleContainer: {
    borderBottomWidth: .2,
    borderBottomColor: '#646360'
  },
  categoryTitle: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    color: 'black'
  },
  listContainer: {
    marginTop: 20
  },
  listItemTitle: {
    marginLeft: 10
  },
  listItemContainer: {
    paddingLeft: 10
  },
  emptyListContainer: {
    borderTopWidth: .2,
    borderBottomColor: '#646360',
    margin: 10
  },
  emptyListText: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 16
  },
  textFont: {
    fontFamily: 'Palatino'
  }
});
