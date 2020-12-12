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
    const [campaignObj, setCampaignObj] = React.useState({image: null, name: null, characters: null});

    //tracks whether the appearance modal is open or not
    const [modalThumbVisible, setModalThumbVisible] = React.useState(false);
    //tracks whether the characters modal is open or not
    const [modalCharsVisible, setModalCharsVisible] = React.useState(false);

    function toggleThumbModal() {
        setModalThumbVisible(!modalThumbVisible);
    }

    function toggleCharsModal() {
        setModalCharsVisible(!modalCharsVisible);
    }

    function setCampaignImage(img) {
        setCampaignObj({...campaignObj, image: img});
    }

    //get the current signed-in user's token from appropriate context
    const userToken = React.useContext(UserTokenContext);

    function publishCampaign() {
        //add this Campaign's state data to the database, only if all fields are completed (no null in state)
        if(campaignObj.image && campaignObj.name){
            const campaignId=uuid.v1(); //set campaign id (campaigns CAN have duplicate names)

            db.ref('allCampaigns/' + userToken + "/"+campaignId).set({
                race: campaignObj.race,
                subrace: campaignObj.subrace,
                image: campaignObj.image,
                classType: campaignObj.classType,
                id: campaignId,
                name: campaignObj.name,
                rank: 0,
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

            {/* modal for the character picker  */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalCharsVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{flex:1}}>
                    <CustomHeader title={"C H A R A C T E R S"} goBack={toggleCharsModal}/>
                    <CharacterDisplay setImage={setCampaignImage} toggleModal={toggleCharsModal} />
                </View>
            </Modal>

            <View style={{flex: 1, alignItems: "center"}}>
                <Text>Enter Campaign Name</Text>
                <TextInput
                    onChangeText={text => setCampaignObj({...campaignObj, name: text})}
                    value={campaignObj.name}
                    style={styles.input}
                />
                <Text>Choose Campaign Thumbnail</Text>
                <TouchableOpacity onPress={toggleThumbModal}>
                    <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} source={campaignObj.image} />
                </TouchableOpacity>

                <Text>Add Characters to Campaign</Text>
                <View style={{height: 110, width: "100%"}}>
                    <ScrollView horizontal={true} style={{borderTop: "2px solid black", borderBottom: "2px solid black", backgroundColor: "#98b8eb"}}>
                        <TouchableOpacity onPress={toggleCharsModal}>
                            <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} source={campaignObj.image} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                
                
                <Button onPress={publishCampaign} title="C R E A T E"/>
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
      }
})

export default CreateCampaign;