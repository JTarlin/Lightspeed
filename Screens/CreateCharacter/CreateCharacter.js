import * as React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

//component imports
import ImageDisplay from "../../Components/ImageDisplay";
import CustomHeader from "../../Components/CustomHeader";
import {UserTokenContext} from "../../Components/context";

//style imports
import {boxStyle} from "../../Components/StyleBox";

//function imports
import {db} from '../../src/config';

function CreateCharacter(props) {

    const navigation = props.navigation;

    //keeps track of our important character info, written to database when submit is pressed
    const [characterObj, setCharacterObj] = React.useState({race: null, subrace: null, image: null, classType: null, name: null});

    //tracks whether the appearance modal is open or not
    const [modalVisible, setModalVisible] = React.useState(false);

    function setSubrace(race) {
        switch(race) {
            case "human":
                return <Picker
                selectedValue={characterObj.subrace}
                style={styles.selector}
                onValueChange={(itemValue) => {setCharacterObj({...characterObj, subrace: itemValue, image: null})}}>
                <Picker.Item label="Choose Subrace" value={null} />
                <Picker.Item label="Tomorran" value="tomorran" />
                <Picker.Item label="Cyborg" value="cyborg" />
                </Picker>
            case "robot":
                return <Picker
                selectedValue={characterObj.subrace}
                style={styles.selector}
                onValueChange={(itemValue) => {setCharacterObj({...characterObj, subrace: itemValue, image: null})}}>
                <Picker.Item label="Choose Subrace" value={null} />
                <Picker.Item label="Android" value="android" />
                <Picker.Item label="Husk" value="husk" />
                </Picker>
            default:
                return <Picker
                selectedValue={characterObj.subrace}
                style={styles.selector}
                onValueChange={(itemValue) => {setCharacterObj({...characterObj, subrace: itemValue, image: null})}}>
                <Picker.Item label="Select Race First!" value="" />
                </Picker>
        }
    }

    function toggleModal() {
        if(characterObj.race && characterObj.subrace) {
            setModalVisible(!modalVisible);
        }
    }

    function setCharacterImage(img) {
        setCharacterObj({...characterObj, image: img});
    }

    //set the classType description based on the chosen option
    function setClassType(classType) {
        switch(classType) {
            case "heavy":
                return (
                    <Text style={styles.classText}>
                        As a heavy, your name means strength. You could be an honourable marine, a ruthless pirate, or anything in between, but you win fights all the same. It may be the others who do the charming, but when things go south, you’re the one who everyone turns to.
                    </Text>)
            case "hunter":
                return (
                    <Text style={styles.classText}>
                        It’s easy for things to go missing in such an immense galaxy - people too. Hunters are the ones who make sure that doesn’t happen, no matter how hidden their quarry may be. Finding your target in the endless sprawl of space isn’t an easy job, but you get it done either way.
                    </Text>)
            case "pilot":
                return (
                    <Text style={styles.classText}>
                        An engine is just a hunk of metal. When you get behind the controls though, it becomes a living thing, and it answers to you. As a pilot, you do the real heavy lifting for your crew, whether they admit it or not.
                    </Text>)
            case "tech":
                return (
                    <Text style={styles.classText}>
                        It isn’t magic that keeps society ticking. It’s all wired up, and you’re the one doing the wiring. As a tech, you are an architect of the future, which is just about here. You could be a warship’s engineer, an undercover hacker, or a scrapyard scavenger.
                    </Text>)
            case "trader":
                return (
                    <Text style={styles.classText}>
                        A lot goes into the crew of a ship, but they probably wouldn’t be there if it weren’t for you. Traders are the ones paying the wages, whether you’re a dealer in exotic xeno beasts or illegal gun parts. The others may do the fighting, but you decide who’s getting shot. 
                    </Text>)
            default:
                return (
                    <Text style={styles.classText}>
                        Your class represents the work you do to make a name for yourself; it determines the abilities you’ve learned and the equipment that you use. Whether you’re a ship’s genius engineer or a renegade bounty hunter, your talents are indispensable.
                    </Text>)
        }
    }

    //get the current signed-in user's token from appropriate context
    const userToken = React.useContext(UserTokenContext);

    function publishCharacter() {
        //add this character's state data to the database, only if all fields are completed (no null in state)
        if(characterObj.classType && characterObj.image && characterObj.subrace && characterObj.race && characterObj.name){
            const characterId=uuid.v1(); //set character id (characters CAN have duplicate names)

            db.ref('allCharacters/' + userToken + "/"+characterId).set({
                race: characterObj.race,
                subrace: characterObj.subrace,
                image: characterObj.image,
                classType: characterObj.classType,
                id: characterId,
                name: characterObj.name,
                rank: 0,
            });

            //if we've successfully published a new char, go to view chars
            navigation.navigate("MyCharacters");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: "column" }}>
            <CustomHeader title={"C R E A T E  C H A R A C T E R"} goBack={()=>{navigation.goBack()}}/>
                
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View >
                    <CustomHeader title={"A P P E A R A N C E"} goBack={toggleModal}/>
                    <ImageDisplay imagetype={characterObj.subrace} setImage={setCharacterImage} toggleModal={toggleModal} />
                </View>
            </Modal>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={styles.label}>Choose Race</Text>
                    <Picker
                        selectedValue={characterObj.race}
                        style={styles.selector }
                        onValueChange={(itemValue) => {setCharacterObj({...characterObj, race: itemValue, subrace: null, image: null});}}>
                        <Picker.Item label="Choose Race" value={null} />
                        <Picker.Item label="Human" value="human" />
                        <Picker.Item label="Robot" value="robot" />
                    </Picker>
                    <Text style={styles.label}>Choose Subrace</Text>
                    {setSubrace(characterObj.race)}
                    <Text style={styles.label}>Enter Name</Text>
                    <TextInput
                        onChangeText={text => setCharacterObj({...characterObj, name: text})}
                        value={characterObj.name}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Choose Appearance</Text>
                    <TouchableOpacity onPress={toggleModal}>
                        <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} source={characterObj.image} />
                    </TouchableOpacity>
                    <Text style={styles.label}>Choose Class</Text>
                    <Picker
                        selectedValue={characterObj.classType}
                        style={styles.selector}
                        onValueChange={(itemValue) => {setCharacterObj({...characterObj, classType: itemValue})}}>
                        <Picker.Item label="Choose Class" value={null} />
                        <Picker.Item label="Heavy" value="heavy" />
                        <Picker.Item label="Hunter" value="hunter" />
                        <Picker.Item label="Pilot" value="pilot" />
                        <Picker.Item label="Tech" value="tech" />
                        <Picker.Item label="Trader" value="trader" />
                    </Picker>
                    {setClassType(characterObj.classType)}
                    <Button onPress={publishCharacter} title="C R E A T E"/>
                </View>
        </View>
    );

}

const styles = StyleSheet.create({
    selector: {...boxStyle.box,
        height: 60, 
        width: 300,
    },
    input: {
        fontSize: 16,
        borderColor: "black",
        borderWidth: 1,
        width: 150,
        height: 40,
        marginBottom: 10,
    },
    label: {
        color: "#68a9de",
        fontSize: 16,
        marginTop: 10,
    },
    classText: {
        ...boxStyle.box,
        backgroundColor: "white",
        margin: 10,
        padding: 10

    }
})

export default CreateCharacter;