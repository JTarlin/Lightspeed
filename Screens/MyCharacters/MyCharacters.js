import * as React from 'react';
import { Button, View, ScrollView, Image, Text, StyleSheet} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";
import CharacterList from "../../Components/CharacterList";

import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

function MyCharacters({ navigation }) {

  //get the current signed-in user's token from appropriate context
  const userToken = React.useContext(UserTokenContext);

  const [characters, setCharacters] = React.useState(null);

  const loadChars=()=>{
    db.ref('allCharacters/' + userToken).once("value", function(snapshot) {
      if(snapshot.exists()) { //if we have characters for this user
        let charArray=Object.values(snapshot.val());
        setCharacters(charArray); //set the characters array to an array of character data from db
      }
    })
  }

  //load characters on initial component render
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadChars();
    });

    return unsubscribe;
  }, [navigation]); //runs on mount and whenever navigation changes

    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: "column" }}>
        <CustomHeader title={"C H A R A C T E R S"} goBack={()=>{navigation.goBack()}}/>
        <Button
            title="Create New Character"
            onPress={() => navigation.push('CreateCharacter')}
          />
        <CharacterList characters={characters} addFunction={null} selectedChars={[]}/>
      </View>
    );
}

export default MyCharacters;