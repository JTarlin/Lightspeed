import * as React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';

import SubraceImages from "./SubraceImages";

// const drawnPath = "../assets/images/drawn/";

export default function ImageDisplay({subrace}) {

    let imagePaths;

    switch(subrace) {
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
        }

    return (

        <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", marginTop: 30}}>
            {imagePaths.map(image=>{
                return <Image style={{height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: "black"}} key={image.id} source={image.image} />
            })}
        </View>
    )
}