import * as React from 'react';
import { Button, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";

import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

export default function CreateGame({navigation}) {

    const [gameObj, setGameObj] = React.useState({title: null, campaign: null, players: null, characters: null})

    return (
        <View style={{flex:1}} >
            <CustomHeader title={"C R E A T E  G A M E"} goBack={()=>{navigation.goBack()}}/>
            <View>
                <View>
                    <Text>Game Title</Text>
                    <TextInput/>
                </View>
            </View>
        </View>
    )
}