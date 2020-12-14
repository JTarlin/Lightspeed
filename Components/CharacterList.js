import * as React from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CharacterList({characters, addFunction, selectedChars}) {

    const navigation = useNavigation();


    const initialCharIds = selectedChars.map(char=>char.id);

    //store the ids of already selected chars so we don't see them displayed to be chosen again
    const [selectedCharIds, setSelectedCharIds] = React.useState(initialCharIds);

    const includeAddButton = (char)=>{
        if(addFunction) {
            return <Button style={{alignSelf: "flex-end"}} onPress={()=>{console.log("pressed character: "+char.name);           
            logCharId(char.id);
            addFunction(char);
        }} title={"Add"}/>;
        }
    }

    //take an id and add it to the selectedCharIds state
    const logCharId = (id)=>{
        // let tempCharIds = selectedCharIds;
        // tempCharIds.push(id);
        // console.log("selected char ids: "+tempCharIds);
        // console.log("actual state selected chars: "+selectedCharIds);
        setSelectedCharIds([...selectedCharIds, id]);
    }

    return (
        <ScrollView style={{flex: 1}}>
        {console.log("characters re-rendering")}
          {characters && characters.map(char=>{
            if(!selectedCharIds.includes(char.id)){
                return (
                    <TouchableOpacity key={char.id} onPress={()=>{navigation.navigate("CharacterSheet", {character: char})}}  >
                        <View key={char.id} style={{height: 100, width: "100%"}}>
                            <View key={char.id} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                <Image source={char.image} style={{height: 80, width: 80, borderRadius: 40, borderWidth: 3, borderColor: "black", marginTop: 30}} key={char.id}/>
                                <Text style={{fontSize: 20, marginLeft: 40}}>{char.name}</Text>
                                {includeAddButton(char)}
                            </View>
                            
                        </View>
                    </TouchableOpacity>)
            }
          })}
        </ScrollView>
    )
}