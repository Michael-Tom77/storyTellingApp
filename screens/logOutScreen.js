import * as React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import firebase from 'firebase'

export default class LogOut extends React.Component{

    componentDidMount(){
        firebase.auth().signOut()
        this.props.navigation.replace("Login")
    }

    render(){
        return(
          <Text>Log Out</Text>  
        )
    }
}