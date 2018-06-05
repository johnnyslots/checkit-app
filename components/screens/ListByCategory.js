import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

class ListByCategory extends React.Component {
  render() {

    const recs = this.props.recs

    return (
      <View style={styles.container}>
        <Text>!CATEGORY!</Text>
        {
          recs.map(rec => {
            return (
              <Text key={rec.id}>{rec.item.title}</Text>
            )
          })
        }

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    recs: state.listByCategory
  }
}

export default connect(mapStateToProps, null)(ListByCategory)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
