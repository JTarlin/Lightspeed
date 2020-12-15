import * as React from 'react';
import { Button, View, Text} from 'react-native';

function FoyerScreen({ navigation }) {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Foyer Screen</Text>
        <Button
          title="Log In To Your Account"
          onPress={() => {navigation.push('LogIn')}}
        />
        <Button
            title="Sign Up For a New Account"
            onPress={() => {navigation.push('SignUp')}}
        />
      </View>
    );
}

export default FoyerScreen;