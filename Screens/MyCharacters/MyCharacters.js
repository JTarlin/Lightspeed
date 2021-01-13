import * as React from 'react';
import { Button, View, ScrollView, Image, Text, StyleSheet} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";
import CharacterList from "../../Components/CharacterList";
import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

//style imports
import { colors } from '../../Components/Colors';

function MyCharacters({ navigation }) {

  //get the current signed-in user's token from appropriate context
  const userData = React.useContext(UserTokenContext);
  const userToken = userData[0];

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
      <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: "column", backgroundColor: colors.midnight }}>
        <CustomHeader title={"C H A R A C T E R S"} goBack={()=>{navigation.goBack()}}/>
        <Button
            title="Create New Character"
            onPress={() => navigation.push('CreateCharacter')}
          />
        {!characters && <Text style={{fontSize: 20, textAlign: "center", marginTop: 20, color: colors.cyan}}>Create a character to see them here</Text>}
        <CharacterList characters={characters} addFunction={null} selectedChars={[]}/>
      </View>
    );
}

export default MyCharacters;