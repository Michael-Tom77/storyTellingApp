
import * as React from 'react';
import BottomTabNavigator from './bottomTabNavigator';
import Profile from '../screens/profile.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './stackNavigator';
import LogOut from '../screens/logOutScreen.js'
import firebase from "firebase";
import CustomSidebarMenu from '../screens/custumSideBarMenu';

const Drawer = createDrawerNavigator();
export default class DrawerNavigator extends Component{
    constructor(){
        super();
        this.state = {
            light_theme : true
        }
    }
    
    componentDidMount(){
        var theme;
        firebase.database().ref("/users/"+firebase.auth().currentUser.uid).on("value", (data)=>{
            theme = data.val().current_theme;
        })
        this.setState({light_theme: theme === "light"? true: false })
    }

    render(){
        var props = this.props;
        
        return(
            <Drawer.Navigator 
            drawerContentOptions={{
                activeTintColor: "",
                inactiveTintColor : this.state.light_theme ? "black" : "white",
                itemStyle: {marginVertical:5}
            }}
            drawerContent={(props)=>{
                <CustomSidebarMenu {...props}/>
            }}
            >
                <Drawer.Screen name = 'Home' component = {StackNavigator}/>
                <Drawer.Screen name = 'Profile' component = {Profile}/>
                <Drawer.Screen name = 'LogOut' component = {LogOut}/>
            </Drawer.Navigator>
        )
    }
     
}
 

