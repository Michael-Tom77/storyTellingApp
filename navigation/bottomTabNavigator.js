import *as React from 'react';
import Feed from '../screens/feed';
import {StyleSheet} from 'react-native'
import CreateStory from '../screens/createStory';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase';

const Tab = createMaterialBottomTabNavigator();
export default class BottomTabNavigator extends React.Component {

   constructor(){
    super()
    this.state= {
      light_theme: true,
    }
   }

   componentDidMount(){
    var theme;
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid)
    .on("value", function (index){
      theme = index.val().current_theme
    }) ;
    this.setState({light_theme: theme === 'light'? true: false})
   }
 
   render(){
    return(
      <Tab.Navigator 
      //  labeled={false}
       barStyle={this.state.light_theme? styles.bottomTabStyleLight: styles.bottomTabStyle}
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CreateStory") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icons}
            />
          );
        }
      })}
      activeColor={"#ee8249"}
      inactiveColor={"gray"}
      >
          <Tab.Screen name="Feed" component={Feed} options={{headerShown:false}}/>
          <Tab.Screen name = "CreateStory" component = {CreateStory} options={{headerShown:false}}/>
      </Tab.Navigator>
  )
  
  }
}

const styles = StyleSheet.create({
    bottomTabStyle: {
      backgroundColor: "#2f345d",
      height: "8%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: "hidden",
      position: "absolute"
    },
    bottomTabStyleLight: {
      backgroundColor: "white",
      height: "8%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: "hidden",
      position: "absolute"
    },
    icons: {
      width: RFValue(30),
      height: RFValue(30)
    }
});

  
