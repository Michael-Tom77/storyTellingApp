import * as React from 'react';
import {Text, View, StyleSheet,Platform, StatusBar, SafeAreaView, Switch, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import firebase from 'firebase';

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
}

SplashScreen.preventAutoHideAsync()

export default class Profile extends React.Component{

    constructor(props){
        super(props)
        this.state({
            fontsLoaded: false,
            isEnabled: false,
            light_theme: true,
            name: "",
            profile_image: ''
        })
    }
    async loadFonts(){
        await Font.loadAsync(customFonts)
        this.setState({fontsLoaded: true})
    }

    async fetchUser(){
        let theme,name,image
        await firebase.database().ref("/users/" + firebase.auth().currentUser.uid)
        .on("value",function(index){
            theme = index.val().current_theme
            name = `${index.val().first_name} ${index.val().last_name}`
            image = index.val().profile_picture
        })
        this.setState({
            light_theme: theme == 'light'? true: false,
            isEnabled: theme == 'light'? false: true,
            name: name,
            profile_image: image,
        })
    }

    componentDidMount(){
        this.loadFonts();
        this.fetchUser();
    }

    toggleSwitch(){
        const previousState = this.state.isEnabled;
        const theme = !this.state.isEnabled? "dark" : "light";
        var updateTheTheme = {}
        updateTheTheme[ '/users/'+firebase.auth().currentUser.uid + "/current_theme" ] = theme
        firebase.database().ref().update(updateTheTheme);
        this.setState({isEnabled: !previousState, light_theme: previousState})
    }

    render(){
        if(this.state.fontsLoaded){
            SplashScreen.hideAsync()
            return(
                <View style = {this.state.light_theme === true ? abc.containerLight : abc.container}>
                    <SafeAreaView style={abc.SafeAreaView}/>
                    <View style={abc.appTitle}>
                        <View style={abc.appIcon}>
                            <Image
                                source={require("../assets/logo.png")}
                                style={abc.iconImage}
                            ></Image>
                         </View>
                         <View style={abc.appTitleTextContainer}>
                            <Text style = {this.state.light_theme === true? abc.appTitleTextLight: abc.appTitleText}>Storytelling App</Text>
                         </View>
                    </View>
                    <View style={abc.screenContainer}>
                        <View style={abc.profileImageContainer}>
                            <Image
                                source={require("../assets/profile_img.png")}
                                style={abc.profileImage}
                            ></Image>
                            <Text style = {this.state.light_theme ? abc.nameTextLight: abc.nameText}>{this.state.name}</Text>
                        </View>
                        <View style={abc.themeContainer}>
                            <Text style = {this.state.light_theme? abc.themeTextLight: abc.themeText}> DARK THEME</Text>
                            <Switch 
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                trackColor={{false: '#767577', true: this.state.light_theme? "white": '#81b0ff'}}
                                thumbColor={this.state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>{this.toggleSwitch()}}
                                value={this.state.isEnabled}
                            />
                        </View>
                        <View style={{ flex: 0.3 }} />
                    </View>
                    <View style={{ flex: 0.08 }} />
                </View>
            )
        }
       
    }
}

const abc = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15193c',
    },
    containerLight: {
        flex: 1,
        backgroundColor: 'white',
    },
    SafeAreaView:{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0
    },

    appTitle: {
        flex: 0.07,
        flexDirection: "row"
      },
      appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
      },
      iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
      },
      appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
      },
      appTitleText: {
        color: "white",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
      },
   
      appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
      },
      screenContainer: {
        flex: 0.85
      },
      profileImageContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
      },
      profileImage: {
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70)
      },
    
      nameText: {
        color: "white",
        fontSize: RFValue(40),
        fontFamily: "Bubblegum-Sans",
        marginTop: RFValue(10)
      },
      nameTextLight: {
        color: "black",
        fontSize: RFValue(40),
        fontFamily: "Bubblegum-Sans",
        marginTop: RFValue(10)
      },
      themeContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: RFValue(20)
      },
      themeText: {
        color: "white",
        fontSize: RFValue(30),
        fontFamily: "Bubblegum-Sans",
        marginRight: RFValue(15)
      },
      themeTextLight: {
        color: "black",
        fontSize: RFValue(30),
        fontFamily: "Bubblegum-Sans",
        marginRight: RFValue(15)
      }
})