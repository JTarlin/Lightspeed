import * as React from "react";
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';

import CustomHeader from "../../Components/CustomHeader";

export default function CharacterSheet ({navigation, ...props}){

    const {character} = props.route.params;

    console.log("character"+character);

    return (
        <View style={{flex:1}}>
            <CustomHeader title={character.name} goBack={()=>{navigation.goBack()}}/>
            <ScrollView style={{flex: 1,}} contentContainerStyle={{alignItems: "center"}}>
                <Image source={character.image} style={styles.mainImage}/>
                <Text style={styles.name} >{character.name}</Text>


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainpage: {
        flex:1,
        backgroundColor: "red",
    },
    mainImage: {
        height: 350,
        width: 350,
    },
    name: {
        fontSize: 24,
        color: "#98b8eb",
    }
});