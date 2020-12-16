import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import CustomHeader from "../../Components/CustomHeader";
import {AuthContext} from "../../Components/context";

function LogInScreen({ navigation }) {

  const [usernameText, setUsernameText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");

  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1}}>
      <CustomHeader title={"L O G I N"} goBack={()=>{navigation.goBack()}}/>
      <View style={{width: "100%", height: 300}}>
        <View style={{flex:1, alignItems: "center", marginTop: 200}}>
          <Text>Enter Username</Text>
          <TextInput
            onChangeText={text => setUsernameText(text)}
            value={usernameText}
            style={styles.input}
          />
          <Text>Enter Password</Text>
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
  }
})

export default LogInScreen;