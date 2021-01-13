import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import { colors } from './Colors';

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
      color: colors.cyan,
      fontWeight: "bold",
    }
  })

export default TitleText;