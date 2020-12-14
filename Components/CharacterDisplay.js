import * as React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';

import CharacterList from "./CharacterList";

import {UserTokenContext} from "./context";

//function imports
import {db} from '../src/config';

// const drawnPath = "../assets/images/drawn/";

export default function CharacterDisplay({addCharacter, selectedChars}) {

    //get the current signed-in user's token from appropriate context
    const userToken = React.useContext(UserTokenContext);

    const [characters, setCharacters] = React.useState(null);

    const loadChars=()=>{
        db.ref('allCharacters/' + userToken).once("value", function(snapshot) {
            if(snapshot.exists()) { //if we have characters for this user
                let charArray=Object.values(snapshot.val());
                setCharacters(charArray); //set the characters array to an array of character data from db
            }
        })
    }

    if(!characters) {
        loadChars();
    }
    
    return (
        <CharacterList characters={characters} addFunction={addCharacter} selectedChars={selectedChars}/>
    )
}