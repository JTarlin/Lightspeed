import * as React from 'react';
import { View} from 'react-native';

import CustomHeader from "../../Components/CustomHeader";
import CharacterDisplay from "../../Components/CharacterDisplay";
import { colors } from '../../Components/Colors';

export default function CharacterSelect(props) {

    const navigation = props.navigation;
    const addCharacter = props.route.params.addCharacter;
    const selectedChars = props.route.params.selectedChars;

    return(
        <View style={{flex:1, backgroundColor: colors.midnight}}>
            <CustomHeader title={"C H A R A C T E R S"} goBack={()=>{navigation.goBack()}}/>
            <CharacterDisplay addCharacter={addCharacter} selectedChars={selectedChars}/>
        </View>

    )
}