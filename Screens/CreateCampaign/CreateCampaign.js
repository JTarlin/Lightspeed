import * as React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import uuid from 'react-native-uuid';

//component imports
import ImageDisplay from "../../Components/ImageDisplay";
import CustomHeader from "../../Components/CustomHeader";
import {UserTokenContext} from "../../Components/context";
import CharacterDisplay from "../../Components/CharacterDisplay";

//function imports
import {db} from '../../src/config';

function CreateCampaign(props) {

    const navigation = props.navigation;

    //keeps track of our important campaign info, written to database when submit is pressed
    const [campaignObj, setCampaignObj] = React.useState({image: null, name: null, characters: []});

    //tracks whether the appearance modal is open or not
    const [modalThumbVisible, setModalThumbVisible] = React.useState(false);
    //tracks whether the characters modal is open or not
    const [modalCharsVisible, setModalCharsVisible] = React.useState(false);
    //load characters on initial component render
    React.useEffect(() => {
        const closemodals = navigation.addListener('blur', () => {
            setModalCharsVisible(false);
        });
        return closemodals;
    }, [navigation]); //runs on mount and whenever navigation changes

    function toggleThumbModal() {
        setModalThumbVisible(!modalThumbVisible);
    }

    //this function opens the page to add new characters
    function addCharacters() {
        navigation.push("CharacterSelect", {addCharacter: setCampaignCharacter, selectedChars: campaignObj.characters});
    }

    //this function is passed down as props, and is called when we want to set a new character into out campaign
    function setCampaignCharacter(char) {
        let newChars = campaignObj.characters;
        newChars.push(char);
        console.log("the current characters array is: "+newChars);
        setCampaignObj({...campaignObj, characters: newChars});

    }

    //changes the campaign thumbnail image when called
    function setCampaignImage(img) {
        setCampaignObj({...campaignObj, image: img});
    }

    //render the characters in this campaign to the screen
    function renderChars(chars){
        return chars.map(char => {
            return (
                <TouchableOpacity onPress={()=>{navigation.push("CharacterSheet", {character: char})}} key={char.id} style={{marginRight: 15}}>
                    <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} source={char.image} />
                    <Text style={styles.charName}>{char.name}</Text>
                </TouchableOpacity>
            )
        })
        
    }

    //get the current signed-in user's token from appropriate context
    const userToken = React.useContext(UserTokenContext);
    function publishCampaign() {
        //add this Campaign's state data to the database, only if all fields are completed (no null in state)
        if(campaignObj.image && campaignObj.name && campaignObj.characters.length>0){
            const campaignId=uuid.v1(); //set campaign id (campaigns CAN have duplicate names)

            db.ref('allCampaigns/' + userToken + "/"+campaignId).set({
                image: campaignObj.image,
                id: campaignId,
                name: campaignObj.name,
                characters: campaignObj.characters,
            });

            //if we've successfully published a new char, go to view chars
            navigation.navigate("MyCampaigns");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: "column" }}>
            <CustomHeader title={"C R E A T E  C A M P A I G N"} goBack={()=>{navigation.goBack()}}/>
            
            {/* modal for the image picker */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalThumbVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{flex:1}}>
                    <CustomHeader title={"T H U M B N A I L"} goBack={toggleThumbModal}/>
                    <ImageDisplay imagetype={"campaign"} setImage={setCampaignImage} toggleModal={toggleThumbModal} />
                </View>
            </Modal>

            <View style={{flex: 1, alignItems: "center"}}>
                <Text style={styles.label}>Enter Campaign Name</Text>
                <TextInput
                    onChangeText={text => setCampaignObj({...campaignObj, name: text})}
                    value={campaignObj.name}
                    style={styles.input}
                />
                <Text style={styles.label}>Choose Campaign Thumbnail</Text>
                <TouchableOpacity onPress={toggleThumbModal}>
                    <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} source={campaignObj.image} />
                </TouchableOpacity>

                <Text style={styles.label}>Add Characters to Campaign</Text>
                <View style={{height: 150, width: "100%"}}>
                    <ScrollView horizontal={true} style={{borderTop: "2px solid black", borderBottom: "2px solid black", ...styles.slidePicker}}>
                        <TouchableOpacity onPress={addCharacters} style={{marginRight: 15}}>
                            <View style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black", backgroundColor: "white"}}/>
                            <Text style={styles.charName}>Add New</Text>
                        </TouchableOpacity>
                        {renderChars(campaignObj.characters)}
                    </ScrollView>
                </View>
                
                <View style={{marginTop: 20}}>
                    <Button onPress={publishCampaign} title="C R E A T E"/>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    selector: {
        height: 60, 
        width: 300
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
    slidePicker: {
        padding: 10,
        backgroundColor: "#98b8eb", 
        flex: 1,
    },
    charName: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 5,
    }
})



export default CreateCampaign;