import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import TitleText from "./TitleText";

function CustomHeader(props) {

    const {title, goBack} = props;
    

    return (
    <View style={{height: 60}}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={goBack}>
            <Text>Back</Text>
        </TouchableOpacity>
        <TitleText >{title}</TitleText>
      </View>
    </View>
    );
}

export default CustomHeader;