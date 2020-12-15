import * as React from 'react';
import { Button, View, ScrollView, Image, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, useWindowDimensions} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import CustomHeader from "../../Components/CustomHeader";
import uuid from 'react-native-uuid';

import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

export default function CreateGame({navigation}) {

    const [gameObj, setGameObj] = React.useState({name: null, campaign: null, players: null, characters: null, public: null, password: null, image: null});

    //get all campaigns for this player to choose from
    const [campaigns, setCampaigns] = React.useState(null);

    const userToken = React.useContext(UserTokenContext);
    const loadCampaigns=()=>{
        db.ref('allCampaigns/' + userToken).once("value", function(snapshot) {
          if(snapshot.exists()) { //if we have campaigns for this user
            let campaignArray=Object.values(snapshot.val());
            setCampaigns(campaignArray); //set the campaigns array to an array of character data from db
          }
        })
    }

    if(!campaigns) {
        loadCampaigns();
    }

    function createGame() {
        //add this Campaign's state data to the database, only if all fields are completed (no null in state)
        if(gameObj.name && gameObj.campaign && (gameObj.public || gameObj.password)){
            const gameId=uuid.v1(); //set game id (games CAN have duplicate names)

            db.ref('allUsersGames/' + userToken + "/"+gameId).set({
                image: gameObj.campaign.image,
                id: gameId,
                name: gameObj.name,
                public: gameObj.public,
                password: gameObj.password,
                characters: gameObj.characters,
                campaign: gameObj.campaign,
                players: gameObj.players,
                creator: userToken,
            });

            db.ref('allGames/'+gameId).set({
                image: gameObj.campaign.image,
                id: gameId,
                name: gameObj.name,
                public: gameObj.public,
                password: gameObj.password,
                characters: gameObj.characters,
                campaign: gameObj.campaign,
                players: gameObj.players,
                creator: userToken,
            });

            //if we've successfully published a new char, go to view chars
            navigation.navigate("OnlineScreen");
        }
    }

    return (
        <KeyboardAvoidingView style={{flex:1}} behavior={"position"} keyboardVerticalOffset={100-useWindowDimensions().height}>
            <ScrollView>
                <CustomHeader title={"C R E A T E  G A M E"} goBack={()=>{navigation.goBack()}}/>
                <View>
                    <View>
                        <Text>Game Title</Text>
                        <TextInput
                            onChangeText={text => setGameObj({...gameObj, name: text})}
                            value={gameObj.name}
                            style={styles.input}
                        />
                        
                    </View>
                    {!gameObj.campaign &&
                    <View>
                        <Text>Choose Campaign</Text>
                        <View style={{height: 160, width: "100%"}}>
                            <ScrollView horizontal={true} style={{borderTop: "2px solid black", borderBottom: "2px solid black", backgroundColor: "#98b8eb"}}>
                                {campaigns && campaigns.map(campaign=>{
                                    return (
                                    <TouchableOpacity onPress={()=>{setGameObj({...gameObj, campaign: campaign})}} key={campaign.id}>
                                        <View style={{width: 110, height: 150, borderRadius: 10}}>
                                            <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} source={campaign.image} />
                                            <Text>{campaign.name}</Text>
                                        </View>
                                    </TouchableOpacity>)
                                })}
                            </ScrollView>
                        </View>
                    </View>}
                    {gameObj.campaign && 
                    <View style={{alignItems: "center"}}>
                        <Text style={{fontSize: 30}}>{gameObj.campaign.name}</Text>
                        <Image
                            style={{height: 300, width: 300, borderRadius: 150, borderWidth: 3, borderColor: "black"}} 
                            source={gameObj.campaign.image}
                        />
                    </View>
                    }
                    <View>
                        <SwitchSelector
                            initial={1}
                            onPress={value => {setGameObj({...gameObj, public: value})}}
                            textColor={'#7a44cf'} //'#7a44cf'
                            selectedColor={'#7a44cf'}
                            buttonColor={'#7a44cf'}
                            borderColor={'#7a44cf'}
                            hasPadding
                            options={[
                                { label: "Public", value: true},
                                { label: "Private", value: false} 
                            ]}
                        />
                        {!gameObj.public &&
                        <View>
                            <Text>Enter Password:</Text>
                            <TextInput 
                                onChangeText={text => setGameObj({...gameObj, password: text})}
                                value={gameObj.password}
                                style={styles.input}
                            />
                        </View>
                        }
                    </View>
                    <Button onPress={()=>{createGame()}} title={"CREATE GAME"} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        borderColor: "black",
        borderWidth: 1,
        width: 150,
        height: 40,
        marginBottom: 10,
      }
})