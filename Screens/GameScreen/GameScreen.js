import * as React from "react";
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';

import CustomHeader from "../../Components/CustomHeader";

export default function GameScreen({navigation, ...props}) {

    const {game} = props.route.params;

    return (
        <View style={{flex:1}}>
            <CustomHeader title={game.name} goBack={()=>{navigation.goBack()}}/>
            <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: "center"}}>
                <Image source={game.image} style={styles.mainImage}/>
                <Text style={styles.name} >{game.name}</Text>


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