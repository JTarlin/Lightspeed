import * as React from 'react';
import { Button, View, Text, StyleSheet} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";
import {Picker} from '@react-native-picker/picker';

function CreateCharacter(props) {

    const navigation = props.navigation;

    const [characterObj, setCharacterObj] = React.useState({race: "", subrace: ""});

    function setSubrace(race) {
        console.log(race);
        switch(race) {
            case "human":
                return <Picker
                selectedValue={characterObj.subrace}
                style={styles.selector}
                onValueChange={(itemValue) => {setCharacterObj({...characterObj, subrace: itemValue})}}>
                <Picker.Item label="Tomorran" value="tomorran" />
                <Picker.Item label="Cyborg" value="cyborg" />
                </Picker>
                break
            case "robot":
                return <Picker
                selectedValue={characterObj.subrace}
                style={styles.selector}
                onValueChange={(itemValue) => {setCharacterObj({...characterObj, subrace: itemValue})}}>
                <Picker.Item label="Android" value="android" />
                <Picker.Item label="Husk" value="husk" />
                </Picker>
                break
            default:
                break
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: "column" }}>
            <CustomHeader title={"C R E A T E  C H A R A C T E R"} goBack={()=>{navigation.goBack()}}/>
            
            <View style={{flex: 1, alignItems: "center"}}>
                <Text>Choose Species</Text>
                <Picker
                    selectedValue={characterObj.race}
                    style={styles.selector}
                    onValueChange={(itemValue) => {setCharacterObj({...characterObj, race: itemValue})}}>
                    <Picker.Item label="Human" value="human" />
                    <Picker.Item label="Robot" value="robot" />
                </Picker>
                <Text>Choose Subspecies</Text>
                {setSubrace(characterObj.race)}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    selector: {
        height: 60, 
        width: 200
    }
})

export default CreateCharacter;