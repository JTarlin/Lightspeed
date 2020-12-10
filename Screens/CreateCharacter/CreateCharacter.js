import * as React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

//component imports
import ImageDisplay from "../../Components/ImageDisplay";
import CustomHeader from "../../Components/CustomHeader";
import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

function CreateCharacter(props) {

    const navigation = props.navigation;

    //keeps track of our important character info, written to database when submit is pressed
    const [characterObj, setCharacterObj] = React.useState({race: null, subrace: null, image: null, destiny: null});

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

    //set the destiny description based on the chosen option
    function setDestiny(destiny) {
        switch(destiny) {
            case "commerce":
                return (
                    <Text>
                        Money is power, and your accounts keep growing. You have something valuable to offer to the people of the galaxy, and they have the money to pay for it. Success is only a matter of time for you.
                    </Text>)
            case "crime":
                return (
                    <Text>
                        In such a vast galaxy, it’s amazing that people still want to tell you what you can and can’t do. By their terms, you would be considered a criminal; too dangerous or destructive to be free. Their mistake, because now they’re your enemy.
                    </Text>)
            case "justice":
                return (
                    <Text>
                        People are capable of despicable things when no one enforces consequences. Society can bring utopia to the stars, but not when it is plagued with chaos. You have devoted yourself to the pursuit of justice, whether you define it or enforce it.
                    </Text>)
            case "paranormal":
                return (
                    <Text>
                        In an age of space exploration, the underlying spirit of the universe can go unnoticed. Your mind is attuned to the great cosmic powers beyond science, and you have witnessed the inexplicable secrets of the universe.
                    </Text>)
            case "technology":
                return (
                    <Text>
                        There would be no interstellar society without the wonders of modern technology. It is your mission to uphold and progress understanding of what tools can accomplish. You are a master of technology, whether you develop it or if it is a part of you.
                    </Text>)
            default:
                return (
                    <Text>
                        There are unlimited ways to solve a problem. What’s often more important is why the problem is being solved. Your motivations may be diverse and complex, but you can always find common ground with likeminded people. The path that you are drawn to may not be inevitable, but in many ways, it is your destiny.
                    </Text>)
        }
    }

    //get the current signed-in user's token from appropriate context
    const userToken = React.useContext(UserTokenContext);

    console.log("base level of create characters context:"+userToken)

    function publishCharacter() {
        //add this character's state data to the database, only if all fields are completed (no null in state)

        
        console.log("user token is: "+userToken);

        if(characterObj.destiny && characterObj.image && characterObj.subrace && characterObj.race){
            console.log("Publishing!");
            const characterId=uuid.v1();

            db.ref('allCharacters/' + userToken + "/characters/"+characterId).set({
                race: characterObj.race,
                subrace: characterObj.subrace,
                image: characterObj.image,
                destiny: characterObj.destiny,
            });
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
                    <ImageDisplay subrace={characterObj.subrace} setImage={setCharacterImage} toggleModal={toggleModal} />
                </View>
            </Modal>

            <View style={{flex: 1, alignItems: "center"}}>
                <Text>Choose Race</Text>
                <Picker
                    selectedValue={characterObj.race}
                    style={styles.selector}
                    onValueChange={(itemValue) => {setCharacterObj({...characterObj, race: itemValue, subrace: null, image: null});}}>
                    <Picker.Item label="Choose Race" value={null} />
                    <Picker.Item label="Human" value="human" />
                    <Picker.Item label="Robot" value="robot" />
                </Picker>
                <Text>Choose Subrace</Text>
                {setSubrace(characterObj.race)}
                <Text>Choose Appearance</Text>
                <TouchableOpacity onPress={toggleModal}>
                    <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} source={characterObj.image} />
                </TouchableOpacity>
                <Text>Choose Destiny</Text>
                <Picker
                    selectedValue={characterObj.destiny}
                    style={styles.selector}
                    onValueChange={(itemValue) => {setCharacterObj({...characterObj, destiny: itemValue})}}>
                    <Picker.Item label="Choose Destiny" value={null} />
                    <Picker.Item label="Commerce" value="commerce" />
                    <Picker.Item label="Crime" value="crime" />
                    <Picker.Item label="Justice" value="justice" />
                    <Picker.Item label="Paranormal" value="paranormal" />
                    <Picker.Item label="Technology" value="technology" />
                </Picker>
                {setDestiny(characterObj.destiny)}
                <Button onPress={publishCharacter} title="C R E A T E"/>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    selector: {
        height: 60, 
        width: 300
    }
})

export default CreateCharacter;