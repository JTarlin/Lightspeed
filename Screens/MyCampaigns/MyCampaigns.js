import * as React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";

import {UserTokenContext} from "../../Components/context";

//style imports
import {boxStyle} from "../../Components/StyleBox";

//function imports
import {db} from '../../src/config';
import { colors } from '../../Components/Colors';

function MyCampaigns({ navigation }) {

  //get the current signed-in user's token from appropriate context
  const userToken = React.useContext(UserTokenContext)[0];

  const [campaigns, setCampaigns] = React.useState(null);

  const loadCampaigns=()=>{
    db.ref('allCampaigns/' + userToken).once("value", function(snapshot) {
      if(snapshot.exists()) { //if we have campaigns for this user
        let campaignArray=Object.values(snapshot.val());
        setCampaigns(campaignArray); //set the campaigns array to an array of character data from db
      }
    })
  }

  //load campaigns on initial component render
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCampaigns();
    });

    return unsubscribe;
  }, [navigation]); //runs on mount and whenever navigation changes

    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: "column", backgroundColor: colors.midnight }}>
        <CustomHeader title={"C A M P A I G N S"} goBack={()=>{navigation.goBack()}}/>
        <TouchableOpacity onPress={() => navigation.push('CreateCampaign')}>
          <View style={{display: "flex", justifyContent: "center", alignItems: "center", height: 40, width: "100%", borderWidth: 2, borderColor: colors.cyan, backgroundColor: colors.blue, borderRadius: 5}}>
            <Text style={{color: colors.cyan, fontWeight: "bold"}}>Create New Campaign</Text>
          </View>
        </TouchableOpacity >
        {!campaigns && <Text style={{fontSize: 20, textAlign: "center", marginTop: 20, color: colors.cyan}}>Create a campaign to see it here</Text>}
        <ScrollView style={{flex: 1}}>
          {campaigns && campaigns.map(campaign=>{
            return (
            <TouchableOpacity style={styles.box} key={campaign.id} onPress={()=>{navigation.push("CampaignScreen", {campaign: campaign})}}>
              <View key={campaign.id} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                <Image
                  source={campaign.image}
                  style={{height: 80, width: 80, borderRadius: 40, borderWidth: 3, marginLeft: 10, borderColor: "black"}}
                  key={campaign.id}/>
                <Text style={styles.name}>{campaign.name}</Text>
              </View>
            </TouchableOpacity>)
          })}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  name: {
      marginLeft: 40,
      fontSize: 25,
      color: "#0d4d82",
  },
  box: {
      height: 100, width: "95%", margin:10, ...boxStyle.box
  }
})

export default MyCampaigns;