import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {AuthContext} from "../../Components/context";
import {colors} from "../../Components/Colors";

//import icon images
import {settingsIcon, onlineIcon, campaignsIcon, charactersIcon} from "../../Components/Icons";
const logo = require("../../assets/icons/logo.png");
const title = require("../../assets/icons/title.png");


function HomeScreen({ navigation }) {

  const {signOut} = React.useContext(AuthContext);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.midnight}}>
        <Image
          style={styles.logoImg}
          source={logo}
        />
        <Image
          style={styles.titleImg}
          source={title}
        />
        <View style={{height: 250, width: 250, marginTop: 30, marginBottom: 50}}>
          <View style={{width: 250, height: 100}}>
            <View style={{flex:1, flexDirection: "row", justifyContent: "space-between"}}>
              <TouchableOpacity
                onPress={() => navigation.push('MyCharacters')} style={styles.buttonBox}
              >
                <Image source={charactersIcon} style={styles.iconImg} />
                <Text style={styles.iconLabel}>CHARACTERS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('MyCampaigns')} style={styles.buttonBox}
              >
                <Image source={campaignsIcon} style={styles.iconImg} />
                <Text style={styles.iconLabel}>CAMPAIGNS</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: 250, height: 100, marginTop: 50}}>
            <View style={{flex:1, flexDirection: "row", justifyContent: "space-between"}}>
              <TouchableOpacity
                onPress={() => navigation.push('OnlineScreen')} style={styles.buttonBox}
              >
                <Image source={onlineIcon} style={styles.iconImg} />
                <Text style={styles.iconLabel}>GAMES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('Home')} style={styles.buttonBox}
              >
                <Image source={settingsIcon} style={styles.iconImg} />
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
  logoImg: {
    height: 200,
    width: 200,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: colors.cyan,
  },
  titleImg: {
    width: 300,
    height: 100,
    resizeMode: "contain",
    marginBottom: 0,
  }, 
  iconImg: {
    height: 80,
    width: 80,
  },
  buttonBox: {
    width: 100, 
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
})


export default HomeScreen;