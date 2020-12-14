import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';

import {AuthContext} from "../../Components/context";
import TitleText from "../../Components/TitleText";

function HomeScreen({ navigation }) {

  const {signOut} = React.useContext(AuthContext);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TitleText >LIGHTSPEED</TitleText>
        <View style={{flex:1, height: 200}}>
          <View style={{flex:1, flexDirection: "row"}}>
            <Button
              title="My Characters"
              onPress={() => navigation.navigate('MyCharacters')}
              style={{flex:1}}
            />
            <Button
              title="Go to Details"
              onPress={() => navigation.navigate('Details')}
              style={{flex:1}}
            />
          </View>
          <View style={{flex:1, flexDirection: "row"}}>
            <Button
              title="Go to Details"
              onPress={() => navigation.navigate('Details')}
              style={{flex:1}}
            />
            <Button
              title="Go to Details"
              onPress={() => navigation.navigate('Details')}
              style={{flex:1}}
            />
          </View>
        
        </View>
        
        <Button 
          title="Sign Out"
          onPress={()=>{signOut()}}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  mainButton: {
    flex: 1,
  }
})

  

export default HomeScreen;