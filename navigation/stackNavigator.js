import * as React from "react";
import BottomTabNavigator from "./bottomTabNavigator.js"
import StoryScreen from "../screens/storyScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNavigator = ()=>{
    return(
        <Stack.Navigator initialRouteName="Home" screenOptions = {{headerShown:false}}>
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Story" component={StoryScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator;


