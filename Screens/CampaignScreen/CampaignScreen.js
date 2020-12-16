import * as React from "react";
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';

import CustomHeader from "../../Components/CustomHeader";
import CharacterList from "../../Components/CharacterList";

export default function CampaignScreen({navigation, ...props}) {

    const {campaign} = props.route.params;

    return (
        <View style={{flex:1}}>
            <CustomHeader title={campaign.name} goBack={()=>{navigation.goBack()}}/>
            <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: "center"}}>
                <Image source={campaign.image} style={styles.mainImage}/>
                <Text style={styles.name} >{campaign.name}</Text>

                <View style={{marginBottom: 30, width: "100%"}}>
                    <Text style={{fontSize: 25, color: "black", fontWeight: "bold", marginTop: 20, marginLeft: 10}} >Characters:</Text>
                    <CharacterList characters={campaign.characters} addFunction={null} selectedChars={[]}/>
                </View>
            </ScrollView>

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
    }
});