import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

function TitleText(props) {
    return (
        <Text style={styles.title}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      color: "#98b8eb"
    }
  })

export default TitleText;