import * as React from 'react';
import { Button, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";

import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

export default function OnlineScreen({navigation}){


    const [games, setGames] = React.useState(null);

    //get the current signed-in user's token from appropriate context
    const userToken = React.useContext(UserTokenContext);
    const loadGames=()=>{
        db.ref('allGames/' + userToken).once("value", function(snapshot) {
        if(snapshot.exists()) { //if we have games for this user
            let gameArray=Object.values(snapshot.val());
            setGames(gameArray); //set the games array to an array of character data from db
        }
        })
    }

    if(!games) {
        loadGames();
    }

    return (
        <View style={{flex:1}}>
            <CustomHeader title={"O N L I N E"} goBack={()=>{navigation.goBack()}}/>
            <TouchableOpacity onPress={()=>{navigation.push("CreateGame")}}>
                <View style={{height: 60, width: "100%", backgroundColor: "#98b8eb"}}>
                    <Text>CREATE NEW GAME</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{console.log("pressed join nrw game")}}>
                <View style={{height: 60, width: "100%", backgroundColor: "#98b8eb"}}>
                    <Text>JOIN NEW GAME</Text>
                </View>
            </TouchableOpacity>
            {games && games.map(game=>{
                return(
                    <TouchableOpacity onPress={()=>{console.log("pushed")}}>
                        <View key={game.id} style={{height: 100, width: "100%"}}>
                            <View key={game.id} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                            <Image
                                source={game.image}
                                style={{height: 80, width: 80, borderRadius: 40, borderWidth: 3, borderColor: "black", marginTop: 30}}
                                key={game.id}/>
                            <Text style={{fontSize: 20, marginLeft: 40}}>{game.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}