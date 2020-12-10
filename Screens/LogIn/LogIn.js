import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';

import {AuthContext} from "../../Components/context";
import StyledInput from "../../Components/StyledInput";

function LogInScreen({ navigation }) {

  const [usernameText, setUsernameText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");

  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Log In Screen</Text>

      <TextInput
        onChangeText={text => setUsernameText(text)}
        value={usernameText}
        style={styles.input}
      />
      <TextInput
        onChangeText={text => setPasswordText(text)}
        value={passwordText}
        style={styles.input}
      />


      <Button
        title="Log In"
        onPress={() => {signIn(usernameText, passwordText)}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderColor: "black",
    borderWidth: 1,
    width: 150,
    height: 30,
  }
})

export default LogInScreen;