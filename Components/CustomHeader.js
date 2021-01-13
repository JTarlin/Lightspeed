import * as React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import TitleText from "./TitleText";

//import icon images
import {backIcon} from "./Icons";

//import style
import {colors} from "./Colors";

function CustomHeader(props) {

    const {title, goBack} = props;

    const fontSizer = (title)=>{
      const titleChars = title.length;
      if(titleChars>24){
        return 50-titleChars;
      }
      return 24;
    }
    

    return (
    <View style={{height: 60, backgroundColor: colors.midnight}}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start'}}>
        <TouchableOpacity onPress={goBack} >
          <Image source={backIcon} style={{height: 20 , width: 40, marginLeft: 20}}/>
        </TouchableOpacity>
        <View style={{marginLeft: 20, marginRight: 80, display: "flex", alignItems: "center", flexGrow: 1}}>
          <Text style={{color: colors.cyan, fontWeight: "bold", fontSize: fontSizer(title)}}>{title}</Text>
        </View>
      </View>
    </View>
    );
}

export default CustomHeader;