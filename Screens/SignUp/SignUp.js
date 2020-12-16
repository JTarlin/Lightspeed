import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput} from 'react-native';

import CustomHeader from "../../Components/CustomHeader";

import {AuthContext} from "../../Components/context";

function SignUpScreen({ navigation }) {

  const [usernameText, setUsernameText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");
  const [emailText, setEmailText] = React.useState("");

  const {signUp} = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1}}>
      <CustomHeader title={"S I G N  U P"} goBack={()=>{navigation.goBack()}}/>
      <View style={{width: "100%", height: 400, marginTop: 200}}>
        <View style={{flex:1, alignItems: "center"}}>
          <Text style={styles.label}>Enter Username</Text>
          <TextInput
            onChangeText={text => setUsernameText(text)}
            value={usernameText}
            style={styles.input}
          />
          <Text style={styles.label}>Enter Password</Text>
          <TextInput
            onChangeText={text => setPasswordText(text)}
            value={passwordText}
            style={styles.input}
            blurOnSubmit={true}
          />
          <Text style={styles.label}>Enter Email</Text>
          <TextInput
            onChangeText={text => setEmailText(text)}
            value={emailText}
            style={styles.input}
          />
          <Text style={{width: 300, marginBottom: 30}}>We might need your email is if you forget your login info and need to recover your account, but you're welcome not to enter one.</Text>
          <Button
            title="Sign Up"
            onPress={() => {signUp(usernameText, passwordText, emailText)}} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderColor: "black",
    borderWidth: 1,
    width: 150,
    height: 40,
    marginBottom: 10,
  },
  label: {
    color: "#68a9de",
    fontSize: 16,
    marginTop: 10,
  }
})

export default SignUpScreen;