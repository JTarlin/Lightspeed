import * as React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';

import SubraceImages from "./SubraceImages";
import CampaignImages from "./CampaignImages";

// const drawnPath = "../assets/images/drawn/";

export default function ImageDisplay({imagetype, setImage, toggleModal}) {

    let imagePaths;

    switch(imagetype) {
        case "tomorran" :
            imagePaths = SubraceImages.human.tomorran;
            break
        case "cyborg" :
            imagePaths = SubraceImages.human.cyborg;
            break
        case "husk" :
            imagePaths = SubraceImages.robot.husk;
            break
        case "android" :
            imagePaths = SubraceImages.robot.android;
            break
        case "campaign" :
            imagePaths = CampaignImages;
        }

    return (

        <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
            {imagePaths.map(image=>{
                return (
                <TouchableOpacity key={image.id} onPress={()=>{setImage(image.image); toggleModal();}}>
                    <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black", marginTop: 30}} key={image.id} source={image.image} />
                </TouchableOpacity>)
            })}
        </View>
    )
}