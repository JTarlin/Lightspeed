import * as React from "react";
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import { colors } from "../../Components/Colors";

import CustomHeader from "../../Components/CustomHeader";

export default function CharacterSheet ({navigation, ...props}){

    const {character} = props.route.params;

    function firstLetterCap(string) {
        const letterArray = string.split("");
        letterArray[0]=letterArray[0].toUpperCase();
        const str = letterArray.join("");
        return str;
    }

    return (
        <View style={{flex:1, backgroundColor: colors.midnight}}>
            <CustomHeader title={character.name} goBack={()=>{navigation.goBack()}}/>
            <ScrollView style={{flex: 1,}} contentContainerStyle={{alignItems: "center"}}>
                <Image source={character.image} style={styles.mainImage}/>
                <Text style={styles.name} >{character.name}</Text>
                <View style={styles.statbox}>
                    <View style={{flex:1, flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={styles.statline}>Rank {character.rank}</Text>
                        <Text style={styles.statline}>{firstLetterCap(character.race)} ({firstLetterCap(character.subrace)})</Text>
                        <Text style={styles.statline}>{firstLetterCap(character.classType)}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainpage: {
        flex:1,
    },
    mainImage: {
        height: 350,
        width: 350,
    },
    name: {
        fontSize: 24,
        color: colors.cyan,
        fontWeight: "bold",
    },
    statbox: {
        width: "80%",
        height: 100,
        marginTop: 20,
    },
    statline: {
        fontSize: 20,
        color: colors.cyan
    }
});