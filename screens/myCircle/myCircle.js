import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, ScrollView ,ImageBackground  } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ListItem } from 'react-native-elements'
import {MaterialCommunityIcons,MaterialIcons,Ionicons} from '@expo/vector-icons'
import backImage from '../../assets/5rVml.png'
import { Permissions, Notifications } from 'expo';



class myCircle extends Component {

    constructor(props) {
        super(props)
  
        this.state = {
            adm: '',
            admin: [],
            ad: false, 
            usr: '',
            user: [],
            us: false
        } 

    }
 
    registerForPushNotification = async()  =>{
        const user = await AsyncStorage.getItem("userToken");
        const db = firebase.firestore();
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
          );
          let finalStatus = existingStatus;
        
          // only ask if permissions have not already been determined, because
          // iOS won't necessarily prompt the user a second time.
          if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;  
          }  
        
          // Stop here if the user did not grant permissions
          if (finalStatus !== 'granted') {
            return;
          }
        
          // Get the token that uniquely identifies this device
          let token = await Notifications.getExpoPushTokenAsync();
          db.collection("users").where("uid", "==", user).onSnapshot(res => {
        
        
            if (res.docs.length) {
                res.docs.forEach(d => {
                      db.collection("users").doc(d.id).update({token: token})
                    
                })
            } 
        })
           }
 componentDidMount(){
    this.registerForPushNotification();
    this.collectCircle(); 
 }



 collectCircle = async()=>{
    const db = firebase.firestore();
    const id = await AsyncStorage.getItem("userToken");

    db.collection("circle").where("uid", "==", id).onSnapshot(res => {
        this.setState({ admin: [] })
    
        if (res.docs.length) {
            res.docs.forEach(d => {
                var e = { id: d.id, name: d.data().circle }
                this.setState({ admin: [...this.state.admin, e], adm: '', ad: true })
            })
        } else {

            this.setState({ adm: 'You do not have any group admin of circle yet' })
        }
    })

    db.collection("circle").onSnapshot(res => {
        res.docs.forEach(a => {

            db.collection("circle").doc(a.id).collection("members").where("uid", "==", id).onSnapshot(b => {
                this.setState({ user: [] })
                if (b.docs.length) {
                    b.docs.forEach(c => {
                        var b = { id: a.id, name: a.data().circle }
                        this.setState({ user: [...this.state.user, b], usr: '', us: true })
                    })
                } else {

                    this.setState({ usr: 'You do not have any  member of circle yet' })

                }

            })
        })
    })

 }

   


    async a(id){


        await AsyncStorage.setItem("roomid",id).then(() =>{
            this.props.navigation.navigate("Map",{room:id})
        })

    }
 
  
    render() {
        const { adm, admin, ad, usr, user, us } = this.state;
        console.log(admin)

        return (
            <ImageBackground
      style={styles.backgroundContainer} source={backImage}>  
            <ScrollView scrollEventThrottle={16} >
   
                <View>
                    <View>
                        {ad ?

                            admin.map((l, i) => (
                                <ListItem
                                    key={i}
                                    leftAvatar={{ source: { uri: 'https://cdn4.iconfinder.com/data/icons/people-std-pack/512/family-512.png' } }}
                                    title={l.name}
                                    subtitle="Admin"
                                    rightTitle={
                                        <View>
                                            <MaterialCommunityIcons name="arrow-right-bold-hexagon-outline" size={32} color="#2b9077" />
                                        </View>
                                    }
                                    onPress={() => this.a(l.id)}
                                />
                            ))
                            :
                            <View style={styles.container}>
                                <Text>{adm}</Text>
                            </View>
                        }
                    </View>

                    <View>
                        {us ?

                            user.map((l, i) => (
                                <ListItem
                                    
                                    key={i}
                                    leftAvatar={{ source: { uri: 'https://cdn4.iconfinder.com/data/icons/people-std-pack/512/family-512.png' } }}
                                    title={l.name}
                                    subtitle="Member"
                                    rightTitle={
                                        <View>
                                            <MaterialCommunityIcons name="arrow-right-bold-hexagon-outline" size={32} color="#2b9077" />
                                        </View>
                                    }
                                    onPress={() => this.a(l.id)}
                                    // badge={{ value: '>', textStyle: { color: 'orange' }, containerStyle: { marginTop: 0,backgroundColor: "#fff" } }}
                                />
                            ))
                            :
                            <View style={styles.container}>
                                <Text>{usr}</Text>
                            </View>
                        }
                    </View>

                </View>
            </ScrollView >
        </ImageBackground>

        );
    }
}
export default myCircle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundContainer: {
        flex: 1,
        width:null,
        height:null,
        alignItems: 'center',
        justifyContent: 'center',
      }
});