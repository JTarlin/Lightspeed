import * as React from 'react';
import { Button, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";

import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

export default function OnlineScreen({navigation}){
    return (
        <View style={{flex:1}}>
            <CustomHeader title={"O N L I N E"} goBack={()=>{navigation.goBack()}}/>
            <TouchableOpacity onPress={()=>{console.log("pressed crete nrw game")}}>
                <View style={{height: 60, width: "100%", backgroundColor: "#98b8eb"}}>
                    <Text>CREATE NEW GAME</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{console.log("pressed join nrw game")}}>
                <View style={{height: 60, width: "100%", backgroundColor: "#98b8eb"}}>
                    <Text>JOIN NEW GAME</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}