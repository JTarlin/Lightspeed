import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView} from 'react-native';

//component imports
import CustomHeader from "../../Components/CustomHeader";
import {UserTokenContext} from "../../Components/context";

//style imports
import {boxStyle} from "../../Components/StyleBox";
//function imports
import {db} from '../../src/config';

export default function JoinGame({navigation}) {

    //store available games in state
    const [games, setGames] = React.useState(null);

    //get the current signed-in user's token from appropriate context
    const username = React.useContext(UserTokenContext)[1];

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

    return (
        <View>
            <CustomHeader title={"J O I N  G A M E"} goBack={()=>{navigation.goBack()}}/>
            <ScrollView >
                <Text style={{textAlign: "center", fontSize: 20}}> Select a Game to Join</Text>
                {games && games.map(game=>{
                    if(game.creator!==username) {
                    return (
                    <TouchableOpacity style={styles.box} key={game.id} onPress={()=>{navigation.push("GameScreen", {gameId: game.id})}}>
                        <View key={game.id} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                            <Image
                                source={game.image}
                                style={{height: 80, width: 80, borderRadius: 40, borderWidth: 3, borderColor: "black", marginLeft: 10}}
                                key={game.id}/>
                            <View style={{marginLeft:40}}>
                                <Text style={styles.name}>{game.name}</Text>
                                <Text>Creator: {game.creator}</Text>
                            </View>
                            <Button 
                                title={"JOIN"}
                                onPress={()=>{navigation.push("AddCharToGame", {game: game})}}
                            />
                        </View>
                    </TouchableOpacity>)}
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        fontSize: 25,
        color: "#0d4d82",
    },
    box: {
        height: 100, width: "95%", margin:10, ...boxStyle.box
    }
  })