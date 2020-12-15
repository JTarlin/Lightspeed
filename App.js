import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext, UserTokenContext} from "./Components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from 'buffer';
import uuid from 'react-native-uuid';

global.Buffer = Buffer; // very important

//screen imports
//if user is signed in
import HomeScreen from "./Screens/Home/Home";
import DetailsScreen from "./Screens/Details/Details";
import MyCharacters from "./Screens/MyCharacters/MyCharacters";
import CreateCharacter from "./Screens/CreateCharacter/CreateCharacter";
import MyCampaigns from "./Screens/MyCampaigns/MyCampaigns";
import CreateCampaign from "./Screens/CreateCampaign/CreateCampaign";
import CharacterSelect from "./Screens/CharacterSelect/CharacterSelect";
import CharacterSheet from "./Screens/CharacterSheet/CharacterSheet";
import CampaignScreen from "./Screens/CampaignScreen/CampaignScreen";
import OnlineScreen from "./Screens/OnlineScreen/OnlineScreen";
import CreateGame from "./Screens/CreateGame/CreateGame";
//if user is signed out
import FoyerScreen from "./Screens/Foyer/Foyer";
import LogInScreen from "./Screens/LogIn/LogIn";
import SignUpScreen from "./Screens/SignUp/SignUp";

//function imports
import {db} from './src/config';

const Stack = createStackNavigator();

function App() {

  //here we set the default values for the authentication process
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  }

  //this reducer sets loginState to new values according to the action we give it (LOGIN, LOGOUT, etc)
  const loginReducer = (prevState, action)=>{
    switch(action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(()=>({
    signIn: (userName, password)=>{
      let userToken;
      userToken = null;

      db.ref('users/'+userName).once("value", function(snapshot) {
        if(snapshot.exists()) {
          //this one is a real user
          //check password
          if(snapshot.val().password===password) {
            //wow they even have the right password!
            userToken=snapshot.val().userToken;
            asyncStoreLogin(userToken);
            dispatch({type: "LOGIN", id: userName, token: userToken})
          } else {
            console.log("wrong username or password");
          }
        } else {
          console.log("wrong username or password");
        }
      });
      
    },
    signOut: async()=>{
      try{
        await AsyncStorage.removeItem("userToken")
      } catch(e) {
        console.log(e);
      }

      dispatch({type: "LOGOUT"})
    },
    signUp: (username, password, email)=>{
      //we only set token if username/password combo is unique and valid
      db.ref('usernames/'+username).once("value", function(snapshot) {
        if(snapshot.exists()) {
          register = false; //because we can't have two users with the same username
        } else {
          let userToken;
          userToken=uuid.v1();

          //add the basic user data to the users list
          db.ref('users/' + username).set({
            username: username,
            password: password,
            userToken: userToken,
            email: email,
          });

          //then add that user's username to the username list
          db.ref('usernames/'+username).set({
            username: username
          })

          dispatch({type: "REGISTER", id: username, token: userToken})
        }
      });
    }
  }), []);

  const asyncStoreLogin = async(userToken)=>{
    if(userToken){
      try{
        await AsyncStorage.setItem("userToken", userToken)
      } catch(e) {
        console.log(e);
      }
    }
  }

  //on component lifecycle, retrieve token from async local storage
  React.useEffect(()=>{
      setTimeout(async()=>{
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem("userToken")
        if(userToken) {
          //we have data
          dispatch({type: "RETRIEVE_TOKEN", token: userToken});
        } else {
          dispatch({type: "LOGOUT"})
        }
      } catch(e) {
        console.log("user token retrieve error: "+e);
      }
    }, 100);
    
  }, []);

  if(loginState.isLoading) {
    return(
      <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  
  return (
    <AuthContext.Provider value={authContext}>
      <UserTokenContext.Provider value={loginState.userToken}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="MyCharacters" component={MyCharacters} />
            <Stack.Screen name="CreateCharacter" component={CreateCharacter} />
            <Stack.Screen name="MyCampaigns" component={MyCampaigns} />
            <Stack.Screen name="CreateCampaign" component={CreateCampaign} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="CharacterSelect" component={CharacterSelect} />
            <Stack.Screen name="CharacterSheet" component={CharacterSheet} />
            <Stack.Screen name="CampaignScreen" component={CampaignScreen} />
            <Stack.Screen name="OnlineScreen" component={OnlineScreen} />
            <Stack.Screen name="CreateGame" component={CreateGame} />
          </Stack.Navigator>
          ) : (
          <Stack.Navigator initialRouteName="Foyer">
            <Stack.Screen name="Foyer" component={FoyerScreen} />
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
          )}
          
        </NavigationContainer>
      </UserTokenContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

