import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage,ImageBackground, Alert } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import {Location} from 'expo';
import { Facebook ,LinearGradient } from 'expo'
import backImage from '../../assets/5rVml.png'
import logo from '../../assets/groupslogo2.jpg'

class SignInScreen extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            loading: false,
            user: null
        });
    }

    componentDidMount(){
        this._getLocationAsync()
    }

    _getLocationAsync = async () => {

        let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Expo.Location.getCurrentPositionAsync({});
        this.setState({ location, condition: true });

        Location.watchPositionAsync({ distanceInterval: 1 }, (coords) => {
            this.setState({ location: coords, latitude: coords.coords.latitude, longitude: coords.coords.longitude })
        });


    }; 

    logIn = async () => {
        const {location, latitude, longitude} = this.state;
        try {
            const db = firebase.firestore();
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Expo.Facebook.logInWithReadPermissionsAsync('2110533629200694', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
                
                const userObj = await response.json().then((uid) => {
                    console.log('uid.id===>',uid.id)
                    this.setState({ uid: uid.id, url: uid.picture.data.url, name: uid.name });
                    db.collection("users").where("uid", "==", uid.id).get().then(res => {
                        if (res.docs.length) {
                            console.log("INSIDE IF======");
                            this.token();
                        } else {
                            console.log("INSIDE else======");
                            db.collection("users").add({ uid: uid.id, url: uid.picture.data.url, name: uid.name, location, latitude, longitude }).then(() => {
                                this.token();
                            })
                        }
                    })
                })


            } else {
                 // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    token = async () => {

        const token = await AsyncStorage.setItem('userToken', `${this.state.uid}`).then(() => {
            this.props.navigation.navigate('App');
        });

    }

    render() {
        return (
            <ImageBackground
      style={styles.backgroundContainer} source={backImage}>
      <View>
      <Image source={logo} style={styles.logo}/>
 </View>
 {/* <View style={styles.textBackground}>
 <Text style={styles.headingtxt}>{`Family App Tracker`}</Text>

 </View> */}
 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,marginBottom:20}}>
        <LinearGradient
          colors={['#f97400', '#f9ab0e', '#e0ad47']}
          style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}>
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 20,
              color: '#fff',
              
            }}>
            Family App Tracker
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.container}>
     
                <TouchableOpacity style={styles.btn} onPress={this.logIn.bind(this)}>
                <LinearGradient
          colors={['#005bef', '#09419b', '#02183a']}
          style={{ alignItems: 'center', borderRadius: 50 }}>
                    <Text style={styles.btn_text}>Sign in with Facebook</Text>
                </LinearGradient>  
                </TouchableOpacity>
            </View>
            </ImageBackground>
            
        );
    }
}
export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 60,
        width: 300,
        color: '#ffbf00',
        // fontSize: 20,
        borderRadius: 50,
        fontWeight: '600',
        backgroundColor: '#14629D',
    },
    headingtxt:{
        color:'#ff4000',
        fontSize:30
    },
    backgroundContainer: {
        flex: 1,
        width:null,
        height:null,
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        width:120,
        height:120,
        opacity:0.7,
        marginTop:10,

        backgroundColor:"transparent"
    },
    textBackground:{
        

    }

});
