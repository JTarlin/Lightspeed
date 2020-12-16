import * as React from "react";
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';

import CustomHeader from "../../Components/CustomHeader";
import CharacterList from "../../Components/CharacterList";

//function imports
import {db} from '../../src/config';


export default function GameScreen({navigation, ...props}) {

    const {gameId} = props.route.params;

    const [game, setGame] = React.useState(null);

    //get game from db using gameId
    const loadGames=()=>{
        db.ref('allGames/'+gameId).once("value", function(snapshot) {
          if(snapshot.exists()) { //if this game exists
            setGame(snapshot.val()); //set the game to data from db
          }
        })
    }

    if(!game) {
        loadGames();
    }


    function playersAndCharacters(players, characters, contacts) {
        const charCards=[]
        for(let i=0; i<players.length; i++){
            charCards.push(
                <View style={styles.playerCard} key={players[i].id}>
                    <Text style={styles.label}>{players[i]}</Text>
                    <View style={{flex:1, flexDirection: "row", justifyContent: "space-around"}}>
                        <View>
                            <Image source={characters[i].image} style={styles.playerCharIcon} />
                            <Text style={styles.label}>{characters[i].name}</Text>
                        </View>
                        <View>
                            <Image source={contacts[i].image} style={styles.playerCharIcon} />
                            <Text style={styles.label}>{contacts[i].name}</Text>
                    </View>
                    </View>
                </View>
            )
        }
        return charCards;
    }

    return (
        <View style={{flex:1}}>
            {game && <View style={{flex:1}}>
                <CustomHeader title={game.name} goBack={()=>{navigation.goBack()}}/>
                <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: "center"}}>
                    <Image source={game.image} style={styles.mainImage}/>
                    <Text style={styles.name} >{game.name}</Text>

                    {game.players&&<View style={{width: "100%"}}>
                        <Text style={{fontSize: 25, color: "black", fontWeight: "bold", marginTop: 20, marginLeft: 10}} >Players:</Text>
                        {playersAndCharacters(game.players, game.playerCharacters, game.contacts)}
                    </View>}
                    <View style={{width: "100%"}}>
                        <Text style={{fontSize: 25, color: "black", fontWeight: "bold", marginTop: 20, marginLeft: 10}} >Characters:</Text>
                        <CharacterList characters={game.characters} addFunction={null} selectedChars={[]}/>
                    </View>

                </ScrollView>

            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    mainImage: {
        height: 350,
        width: 350,
    },
    name: {
        fontSize: 24,
        color: "#98b8eb",
    },
    playerCard: {
        width: "95%",
        borderWidth: 3,
        borderColor: "#0d4d82",
        marginLeft: 10,
        padding: 15,
        marginTop: 10,
        borderRadius: 50,
    },
    label: {
        textAlign: "center",
        fontSize: 20,
        color: "#98b8eb"
    },
    playerCharIcon: {
        height: 100, width: 100, borderRadius: 50, borderColor: "black", borderWidth: 3,
        marginTop: 10,
    }
});