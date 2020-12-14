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

        </View>
    )
}