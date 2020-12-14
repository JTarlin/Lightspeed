import * as React from 'react';
import { Button, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomHeader from "../../Components/CustomHeader";

import {UserTokenContext} from "../../Components/context";

//function imports
import {db} from '../../src/config';

function MyCampaigns({ navigation }) {

  //get the current signed-in user's token from appropriate context
  const userToken = React.useContext(UserTokenContext);

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
      <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: "column" }}>
        <CustomHeader title={"C A M P A I G N S"} goBack={()=>{navigation.goBack()}}/>
        <Button
          title="Create New Campaign"
          onPress={() => navigation.push('CreateCampaign')}
        />
        <ScrollView style={{flex: 1}}>
          {campaigns && campaigns.map(campaign=>{
            return (
            <TouchableOpacity onPress={()=>{navigation.push("CampaignScreen", {campaign: campaign})}}>
              <View key={campaign.id} style={{height: 100, width: "100%"}}>
                <View key={campaign.id} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                  <Image
                    source={campaign.image}
                    style={{height: 80, width: 80, borderRadius: 40, borderWidth: 3, borderColor: "black", marginTop: 30}}
                    key={campaign.id}/>
                  <Text style={{fontSize: 20, marginLeft: 40}}>{campaign.name}</Text>
                </View>
              </View>
            </TouchableOpacity>)
          })}
        </ScrollView>
      </View>
    );
}

export default MyCampaigns;