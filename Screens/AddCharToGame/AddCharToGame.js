import * as React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import uuid from 'react-native-uuid';

//component imports
import CustomHeader from "../../Components/CustomHeader";
import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';
import JoinGame from '../JoinGame/JoinGame';

export default function AddCharToGame({navigation, ...props}) {

    const {game} = props.route.params;

    const [myChars, setMyChars] = React.useState(null);
    const [myCharacter, setMyCharacter] = React.useState(null);
    const [myContact, setMyContact] = React.useState(null);
    const [gameObj, setGameObj] = React.useState(game);

    //get the current signed-in user's token from appropriate context
    const userToken = React.useContext(UserTokenContext);
    const loadChars=()=>{
        db.ref('allCharacters/' + userToken).once("value", function(snapshot) {
          if(snapshot.exists()) { //if we have characters for this user
            let charArray=Object.values(snapshot.val());
            setMyChars(charArray); //set the characters array to an array of character data from db
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

    function joinGame() {
        console.log("join game");

        //if certain fields need to be created if empty
        if(!game.playerCharacters) {
            game.playerCharacters=[];
        }
        if(!game.players) {
            game.players=[];
        }
        
        //add this Game's state data to the database, only if all fields are completed (no null in state)
        if(myCharacter && myContact){
            const gameId=uuid.v1(); //set campaign id (campaigns CAN have duplicate names)

            db.ref('allUsersGames/' + userToken + "/"+gameId).set({...game,
                playerCharacters: game.playerCharacters.push(myCharacter),
                players: game.players.push(userToken),
            });

            db.ref('allGames/'+game.id).set({...game,
                playerCharacters: game.playerCharacters.push(myCharacter),
                players: game.players.push(userToken),
            });

            //if we've successfully published a new char, go to view chars
            navigation.navigate("MyCampaigns");
        }
    }

    return (
        <View style={{flex:1}} >
            <CustomHeader title={"A D D  C H A R A C T E R"} goBack={()=>{navigation.goBack()}}/>
            {!myCharacter &&
            <View>
                <Text>Select Your Character</Text>
                <View style={{height: 160, width: "100%"}}>
                    <ScrollView horizontal={true} style={{borderTop: "2px solid black", borderBottom: "2px solid black", backgroundColor: "#98b8eb"}}>
                        {myChars && myChars.map(character=>{
                            return (
                            <TouchableOpacity onPress={()=>{setMyCharacter(character)}} key={character.id}>
                                <View style={{width: 110, height: 150, borderRadius: 10}}>
                                    <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} source={character.image} />
                                    <Text>{character.name}</Text>
                                </View>
                            </TouchableOpacity>)
                        })}
                    </ScrollView>
                </View>
            </View>}
            {myCharacter && 
            <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 20}}>You will be playing as:</Text>
                <Text style={{fontSize: 30}}>{myCharacter.name}</Text>
                <Image
                    style={{height: 200, width: 200, borderRadius: 100, borderWidth: 3, borderColor: "black"}} 
                    source={myCharacter.image}
                />
            </View>}
            {/* set character contact from campaign characters in game */}
            {!myContact &&
            <View>
                <Text>Select Your Contact</Text>
                <View style={{height: 160, width: "100%"}}>
                    <ScrollView horizontal={true} style={{borderTop: "2px solid black", borderBottom: "2px solid black", backgroundColor: "#98b8eb"}}>
                        {game.campaign.characters && game.campaign.characters.map(character=>{
                            return (
                            <TouchableOpacity onPress={()=>{setMyContact(character)}} key={character.id}>
                                <View style={{width: 110, height: 150, borderRadius: 10}}>
                                    <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} source={character.image} />
                                    <Text>{character.name}</Text>
                                </View>
                            </TouchableOpacity>)
                        })}
                    </ScrollView>
                </View>
            </View>}
            {myContact && 
            <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 20}}>Your Character's Contact:</Text>
                <Text style={{fontSize: 30}}>{myContact.name}</Text>
                <Image
                    style={{height: 200, width: 200, borderRadius: 100, borderWidth: 3, borderColor: "black"}} 
                    source={myContact.image}
                />
            </View>}
            {myContact && myCharacter && <Button title={"JOIN GAME"} onPress={()=>{joinGame()}} />}
        </ View >
    )
}