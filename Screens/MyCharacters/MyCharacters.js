import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";

function MyCharacters({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: "column" }}>
        <CustomHeader title={"C H A R A C T E R S"} goBack={()=>{navigation.goBack()}}/>
        <View style={{flex: 1}}>
          <Button
            title="Create New Character"
            onPress={() => navigation.push('CreateCharacter')}
          />
        </View>
      </View>
    );
}

export default MyCharacters;