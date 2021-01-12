import * as React from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

//style imports
import {boxStyle} from "./StyleBox";

export default function CharacterList({characters, addFunction, selectedChars}) {

    const navigation = useNavigation();


    const initialCharIds = selectedChars.map(char=>char.id);

    //store the ids of already selected chars so we don't see them displayed to be chosen again
    const [selectedCharIds, setSelectedCharIds] = React.useState(initialCharIds);

    const includeAddButton = (char)=>{
        if(addFunction) {
            return <Button key={char.id} style={{alignSelf: "flex-end"}} onPress={()=>{           
            logCharId(char.id);
            addFunction(char);
        }} title={"Add"}/>;
        }
    }

    //take an id and add it to the selectedCharIds state
    const logCharId = (id)=>{
        setSelectedCharIds([...selectedCharIds, id]);
    }

    return (
        <ScrollView style={{flex: 1}}>
          {characters && characters.map(char=>{
            if(!selectedCharIds.includes(char.id)){
                return (
                    <TouchableOpacity key={char.id} onPress={()=>{navigation.navigate("CharacterSheet", {character: char})}}  >
                        <View style={styles.box}>
                            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                <Image source={char.image} style={{height: 80, width: 80, marginLeft: 10, borderRadius: 40, borderWidth: 3, borderColor: "black"}}/>
                                <View style={{display: "flex", flexGrow: 1, flexDirection: "row", justifyContent: "space-between", marginRight: 20}}>
                                    <Text style={{...styles.name}}>{char.name}</Text>
                                    {includeAddButton(char)}
                                </View>
                            </View>
                            
                        </View>
                    </TouchableOpacity>)
            }
          })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    name: {
        marginLeft: 40,
        fontSize: 25,
        color: "#0d4d82",
    },
    box: {
        height: 100, width: "95%", margin:10, ...boxStyle.box
    }
})