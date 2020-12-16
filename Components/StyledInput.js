import * as React from 'react';
import {TextInput, StyleSheet} from 'react-native';

function StyledInput(props) {
    return (
      <TextInput style={styles.input}/>
    )
}

const styles = StyleSheet.create({
    input: {
      fontSize: 20,
      borderColor: "black",
      borderWidth: 1
    }
  })

export default StyledInput;