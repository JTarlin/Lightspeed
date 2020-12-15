import * as React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';

//component imports
import CustomHeader from "../../Components/CustomHeader";
import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

export default function JoinGame({navigation}) {

    //store available games in state
    const [games, setGames] = React.useState(null);

    //get games from db
    const loadGames=()=>{
        db.ref('allGames').once("value", function(snapshot) {
          if(snapshot.exists()) { //if any games exist
            let gameArray=Object.values(snapshot.val());
            setGames(gameArray); //set the game array to an array of game data from db
          }
        })
    }

    if(!games) {
        loadGames();
    }

    //get the current signed-in user's token from appropriate context
    const userToken = React.useContext(UserTokenContext);


    return (
        <View>
            <CustomHeader title={"J O I N  G A M E"} goBack={()=>{navigation.goBack()}}/>
            <ScrollView >
                <Text> Select a Game to Join</Text>
                {games && games.map(game=>{
                    return (
                    <TouchableOpacity key={game.id} onPress={()=>{console.log("pushed game button")}}>
                        {/* navigation.push("gameScreen", {game: game}) */}
                        <View key={game.id} style={{height: 100, width: "100%"}}>
                            <View key={game.id} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                            <Image
                                source={game.image}
                                style={{height: 80, width: 80, borderRadius: 40, borderWidth: 3, borderColor: "black", marginTop: 30}}
                                key={game.id}/>
                            <Text style={{fontSize: 20, marginLeft: 40}}>{game.name}</Text>
                            <Button 
                                title={"JOIN"}
                                onPress={()=>{console.log("joined game")}}
                            />
                            </View>
                        </View>
                    </TouchableOpacity>)
                })}
            </ScrollView>
        </View>
    )
}