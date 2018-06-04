import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

class ListByCategory extends React.Component {
  render() {
    console.log('props', this.props.recs)
    return (
      <View style={styles.container}>
        <Text>!CATEGORY!</Text>

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
