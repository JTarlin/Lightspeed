import * as React from 'react';
import { Button, View, ScrollView, Image, Text, StyleSheet} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";

import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

function MyCampaigns({ navigation }) {

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

  //only read database if we haven't set characters yet
  // if(!characters){
  //   loadChars();
  // }

    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: "column" }}>
        <CustomHeader title={"C A M P A I G N S"} goBack={()=>{navigation.goBack()}}/>
        <Button
          title="Create New Campaign"
          onPress={() => navigation.push('CreateCampaign')}
        />
        <ScrollView style={{flex: 1}}>
          
          

          {characters && characters.map(char=>{
            return (
            <View key={char.id} style={{height: 100, width: "100%"}}>
              <View key={char.id} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                <Image source={char.image} style={{height: 80, width: 80, borderRadius: 40, borderWidth: 3, borderColor: "black", marginTop: 30}} key={char.id}/>
                <Text style={{fontSize: 20, marginLeft: 40}}>{char.name}</Text>
              </View>
            </View>)
          })}
        </ScrollView>
      </View>
    );
}

export default MyCampaigns;