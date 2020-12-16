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
      fontSize: 24,
      color: "#98b8eb",
      fontWeight: "bold",
    }
  })

export default TitleText;