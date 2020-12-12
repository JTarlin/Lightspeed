import * as React from "react";
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';

import CustomHeader from "../../Components/CustomHeader";

export default function CharacterSheet (){

    return (
        <View style={StyleSheet.mainpage}>
            <CustomHeader title={"C A M P A I G N S"} goBack={()=>{navigation.goBack()}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainpage: {
        flex:1, flexDirection: "column"
    }
});