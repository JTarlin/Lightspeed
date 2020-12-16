import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {AuthContext} from "../../Components/context";
import TitleText from "../../Components/TitleText";

//import icon images
import {settingsIcon, onlineIcon, campaignsIcon, charactersIcon} from "../../Components/Icons";

function HomeScreen({ navigation }) {

  const {signOut} = React.useContext(AuthContext);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.mainTitle}>L I G H T S P E E D</Text>
        <View style={{height: 300, width: 300, marginTop: 50, marginBottom: 50}}>
          <View style={{width: 300, height: 100}}>
            <View style={{flex:1, flexDirection: "row", justifyContent: "space-between"}}>
              <TouchableOpacity
                onPress={() => navigation.push('MyCharacters')} style={{width: 100, height: 100, borderRadius: 50}}
              >
                <Image source={charactersIcon} style={{height: 100, width: 100}} />
                <Text style={styles.iconLabel}>CHARACTERS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('MyCampaigns')} style={{width: 100, height: 100, borderRadius: 50}}
              >
                <Image source={campaignsIcon} style={{height: 100, width: 100}} />
                <Text style={styles.iconLabel}>CAMPAIGNS</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: 300, height: 100, marginTop: 100}}>
            <View style={{flex:1, flexDirection: "row", justifyContent: "space-between"}}>
              <TouchableOpacity
                onPress={() => navigation.push('OnlineScreen')} style={{width: 100, height: 100, borderRadius: 50}}
              >
                <Image source={onlineIcon} style={{height: 100, width: 100}} />
                <Text style={styles.iconLabel}>GAMES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('Home')} style={{width: 100, height: 100, borderRadius: 50}}
              >
                <Image source={settingsIcon} style={{height: 100, width: 100}} />
                <Text style={styles.iconLabel}>SETTINGS</Text>
              </TouchableOpacity>
            </View>
          </View>
        
        </View>
        
        <Button 
          title="Sign Out"
          onPress={()=>{signOut()}}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  mainButton: {
    flex: 1,
  },
  iconLabel: {
    textAlign: "center",
    fontSize: 14,
    color: "#98b8eb",
  },
  mainTitle: {
    marginTop: 100,
    fontSize: 40,
    fontWeight: "bold",
    color:  "#98b8eb",
  }
})

export default HomeScreen;