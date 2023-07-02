import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase'

SplashScreen.preventAutoHideAsync();

var customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
}

var stories = require("./stories.json")

export default class StoryCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            is_liked: false,
            likes: this.props.story.value.likes,
            story_id: this.props.story.key,
            story_data:this.props.story.value,
            light_theme:true
        };
    }

    likeAction = ()=>{
        if(this.state.is_liked){
                firebase.database().ref("/posts/")
                .child(this.state.story_id)
                .child("likes")
                .set(firebase.database.ServerValue.increment(-1))
                this.setState({likes: (this.state.likes-=1),is_liked:false })
        }
        else{
            firebase.database().ref("/posts/")
                .child(this.state.story_id)
                .child("likes")
                .set(firebase.database.ServerValue.increment(+1))
                this.setState({likes: (this.state.likes +=1),is_liked:true })
        }
    }

    async loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount(){
        this.loadFontsAsync();
        this.getTheme();
    }
    
    getTheme = ()=>{
        var theme;
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid)
        .on("value", function (index){
          theme = index.val().current_theme
        }) ;
        this.setState({light_theme: theme === 'light'? true: false})
    }

    render() {
        if (this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            return (
                
                <TouchableOpacity style={styles.container} onPress = {()=>{
                    this.props.navigation.navigate("Story",{story: this.props.story})
                }}>
                    <View style={styles.cardContainer}>
                        <Image
                            source={require("../assets/story_image_1.png")}
                            style={styles.storyImage}
                        ></Image>

                        <View style={styles.titleContainer}>
                            <Text style={styles.storyTitleText}>
                                {this.state.story_data.title}
                            </Text>
                            <Text style={styles.storyAuthorText}>
                                {this.state.story_data.author}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {this.state.story_data.description}
                            </Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <TouchableOpacity style={
                                this.state.is_liked ? styles.likeButtonLiked : styles.likeButtonDisliked
                            } onPress = {()=>{
                                this.likeAction()
                            }}>
                                <Ionicons name={"heart"} size={RFValue(30)} color={
                                    this.state.light_theme?"black":"white"
                                } />
                                <Text style={styles.likeText}>{this.state.likes}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
    },
    storyImage: {
        resizeMode: "contain",
        width: "95%",
        alignSelf: "center",
        height: RFValue(250)
    },
    titleContainer: {
        paddingLeft: RFValue(20),
        justifyContent: "center"
    },
    storyTitleText: {
        fontSize: RFValue(25),
        fontFamily: "Bubblegum-Sans",
        color: "white"
    },
    storyAuthorText: {
        fontSize: RFValue(18),
        fontFamily: "Bubblegum-Sans",
        color: "white"
    },
    descriptionText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#eb3948",
    borderWidth: 2,
    borderRadius: RFValue(30)
  },
});