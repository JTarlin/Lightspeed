import * as React from 'react';
import { Button, View, ScrollView, Image, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";

import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

export default function CreateGame({navigation}) {

    const [gameObj, setGameObj] = React.useState({title: null, campaign: null, players: null, characters: null});

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

    return (
        <View style={{flex:1}} >
            <CustomHeader title={"C R E A T E  G A M E"} goBack={()=>{navigation.goBack()}}/>
            <View>
                <View>
                    <Text>Game Title</Text>
                    <TextInput
                        onChangeText={text => setGameObj({...gameObj, title: text})}
                        value={gameObj.title}
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
                                <TouchableOpacity onPress={()=>{setGameObj({...gameObj, campaign: campaign})}}>
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
            </View>
        </View>
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