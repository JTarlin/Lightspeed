import * as React from 'react';
import { View, TouchableOpacity, Image} from 'react-native';
import TitleText from "./TitleText";

//import icon images
import {backIcon} from "./Icons"

function CustomHeader(props) {

    const {title, goBack} = props;
    

    return (
    <View style={{height: 60}}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start'}}>
        <TouchableOpacity onPress={goBack} >
            <Image source={backIcon} style={{height: 20 , width: 40, marginLeft: 20}}/>
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <TitleText >{title}</TitleText>
        </View>
      </View>
    </View>
    );
}

export default CustomHeader;