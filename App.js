import React from 'react';
import { Text, View } from 'react-native';

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
      <HomeScreen></HomeScreen>
    </View>
  )
}
export default HelloWorldApp;

const HomeScreen = () => {
  return (
    <View>
      <Text>
        L I G H T S P E E D
      </Text>
    </View>
  )
}