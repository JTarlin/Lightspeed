import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';

function FoyerScreen({ navigation }) {

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.mainTitle}>L I G H T S P E E D</Text>
        <View style={{marginBottom: 10}} >
        <Button
          title="Log In To Your Account"
          onPress={() => {navigation.push('LogIn')}}
        />
        </View>
        <Button
            title="Sign Up For a New Account"
            onPress={() => {navigation.push('SignUp')}}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  mainTitle: {
    marginTop: 200,
    marginBottom: 100,
    fontSize: 40,
    fontWeight: "bold",
    color:  "#98b8eb",
  }
})

export default FoyerScreen;