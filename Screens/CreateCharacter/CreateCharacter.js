import * as React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TouchableOpacity, Image} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";
import {Picker} from '@react-native-picker/picker';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import ImageDisplay from "../../Components/ImageDisplay";

function CreateCharacter(props) {

    const navigation = props.navigation;

    //keeps track of our important character info, written to database when submit is pressed
    const [characterObj, setCharacterObj] = React.useState({race: null, subrace: null, image: null});

    //tracks whether the appearance modal is open or not
    const [modalVisible, setModalVisible] = React.useState(false);

    function setSubrace(race) {
        switch(race) {
            case "human":
                return <Picker
                selectedValue={characterObj.subrace}
                style={styles.selector}
                onValueChange={(itemValue) => {setCharacterObj({...characterObj, subrace: itemValue})}}>
                <Picker.Item label="Choose Subrace" value={null} />
                <Picker.Item label="Tomorran" value="tomorran" />
                <Picker.Item label="Cyborg" value="cyborg" />
                </Picker>
                break
            case "robot":
                return <Picker
                selectedValue={characterObj.subrace}
                style={styles.selector}
                onValueChange={(itemValue) => {setCharacterObj({...characterObj, subrace: itemValue})}}>
                <Picker.Item label="Choose Subrace" value={null} />
                <Picker.Item label="Android" value="android" />
                <Picker.Item label="Husk" value="husk" />
                </Picker>
                break
            default:
                return <Picker
                selectedValue={characterObj.subrace}
                style={styles.selector}
                onValueChange={(itemValue) => {setCharacterObj({...characterObj, subrace: itemValue})}}>
                <Picker.Item label="Select Race First!" value="" />
                </Picker>
                break
        }
    }

    function toggleModal() {
        if(characterObj.race && characterObj.subrace) {
            setModalVisible(!modalVisible);
        }
        
    }

    function setCharacterImage(img) {
        console.log("running set character image function");
        setCharacterObj({...characterObj, image: img});
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
                <View style={styles.centeredView}>
                    <CustomHeader title={"A P P E A R A N C E"} goBack={toggleModal}/>
                    <Text style={styles.modalText}>Hello World!</Text>
                    
                    <TouchableHighlight
                        style={{backgroundColor: "#2196F3" }}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                        >
                        <Text >Hide Modal</Text>
                    </TouchableHighlight>

                    <ImageDisplay subrace={characterObj.subrace} setImage={setCharacterImage} toggleModal={toggleModal} />
                </View>
            </Modal>

            <View style={{flex: 1, alignItems: "center"}}>
                <Text>Choose Race</Text>
                <Picker
                    selectedValue={characterObj.race}
                    style={styles.selector}
                    onValueChange={(itemValue) => {setCharacterObj({...characterObj, race: itemValue})}}>
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