import * as React from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CharacterList({characters}) {

    const navigation = useNavigation();

    return (
        <ScrollView style={{flex: 1}}>
          {characters && characters.map(char=>{
            return (
            <TouchableOpacity key={char.id} onPress={()=>{navigation.navigate("CharacterSheet"), {char}}}>
                <View key={char.id} style={{height: 100, width: "100%"}}>
                    <View key={char.id} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                        <Image source={char.image} style={{height: 80, width: 80, borderRadius: 40, borderWidth: 3, borderColor: "black", marginTop: 30}} key={char.id}/>
                        <Text key={char.id} style={{fontSize: 20, marginLeft: 40}}>{char.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
          })}
        </ScrollView>
    )
}