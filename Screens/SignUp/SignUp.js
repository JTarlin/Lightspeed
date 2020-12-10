import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput} from 'react-native';

import {AuthContext} from "../../Components/context";

function SignUpScreen({ navigation }) {

  const [usernameText, setUsernameText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");
  const [emailText, setEmailText] = React.useState("");

  const {signUp} = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign Up Screen</Text>
      <TextInput
        onChangeText={text => setUsernameText(text)}
        value={usernameText}
        style={styles.input}
      />
      <TextInput
        onChangeText={text => setPasswordText(text)}
        value={passwordText}
        style={styles.input}
        blurOnSubmit={true}
      />
      <TextInput
        onChangeText={text => setEmailText(text)}
        value={emailText}
        style={styles.input}
      />
      <Button
        title="Sign Up"
        onPress={() => {signUp(usernameText, passwordText, emailText)}} 
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
    marginBottom: 10,
  }
})

export default SignUpScreen;