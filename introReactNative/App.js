import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.teste}>Olar</Text>
        <Text style={styles.teste}>teste 123</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  teste: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
});

// export default App;
