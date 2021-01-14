import * as React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";

import {UserTokenContext} from "../../Components/context";

//style imports
import {boxStyle} from "../../Components/StyleBox";

//function imports
import {db} from '../../src/config';
import { colors } from '../../Components/Colors';

export default function OnlineScreen({navigation}){


    const [games, setGames] = React.useState(null);

    //get the current signed-in user's token from appropriate context
    const userToken = React.useContext(UserTokenContext)[0];
    const loadGames=()=>{
        db.ref('allUsersGames/' + userToken).once("value", function(snapshot) {
        if(snapshot.exists()) { //if we have games for this user
            let gameArray=Object.values(snapshot.val());
            setGames(gameArray); //set the games array to an array of character data from db
        }
        })
    }

    //load games on initial component render
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        loadGames();
        });

        return unsubscribe;
    }, [navigation]); //runs on mount and whenever navigation changes

    return (
        <View style={{flex:1, backgroundColor: colors.midnight}}>
            <CustomHeader title={"G A M E S"} goBack={()=>{navigation.goBack()}}/>
            <View style={{marginBottom:10}}>
                <TouchableOpacity onPress={() => navigation.push('CreateGame')}>
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", height: 40, width: "100%", borderWidth: 2, borderColor: colors.cyan, backgroundColor: colors.blue, borderRadius: 5}}>
                        <Text style={{color: colors.cyan, fontWeight: "bold"}}>Create New Game</Text>
                    </View>
                </TouchableOpacity >
            </View>
            <TouchableOpacity onPress={() => navigation.push('JoinGame')}>
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", height: 40, width: "100%", borderWidth: 2, borderColor: colors.cyan, backgroundColor: colors.blue, borderRadius: 5}}>
                        <Text style={{color: colors.cyan, fontWeight: "bold"}}>Join New Game</Text>
                    </View>
                </TouchableOpacity >
            {games && <Text style={{fontSize: 20, textAlign: "center", marginTop: 20}}>My Games:</Text>}
            {!games && <Text style={{fontSize: 20, textAlign: "center", marginTop: 20, color: colors.cyan}}>Create or join a game to see it here</Text>}
            {games && games.map(game=>{
                return(
                    <TouchableOpacity key={game.id} onPress={()=>{navigation.push("GameScreen", {gameId: game.id})}} style={styles.box}>
                        <View key={game.id} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                            <Image
                                source={game.image}
                                style={{height: 80, width: 80, borderRadius: 40, borderWidth: 3, borderColor: "black", marginLeft: 10}}
                                key={game.id}/>
                                <View style={{marginLeft: 40}} >
                                    <Text style={styles.name}>{game.name}</Text>
                                    <Text>Creator: {game.creator}</Text>
                                </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
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