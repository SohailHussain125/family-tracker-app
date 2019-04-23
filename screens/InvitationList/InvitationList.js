import React, { Component } from "react";
import {
    View, StyleSheet, AsyncStorage, TouchableOpacity, TextInput, ImageBackground, Icon, Image, Picker,
    Dimensions, ScrollView
} from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Location } from 'expo';
import { Avatar, Text, List, ListItem, SearchBar } from 'react-native-elements';
import { Button, } from 'native-base';
import UUIDGenerator from 'react-native-uuid-generator';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import backImage from '../../assets/5rVml.png'
import logo from '../../assets/groupslogo2.jpg'


const { width: WIDTH } = Dimensions.get('window')
class InvitationList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inviteObj:{},
            show:false
        }
    }


    async componentDidMount() {
        let  { inviteObj } = this.state
        const db = firebase.firestore();
        const user = await AsyncStorage.getItem("userToken");

        db.collection('users').where("uid", "==", user).onSnapshot(res => {

            if (res.docs.length) {
                res.docs.forEach(data => {
                    if(data.data().hasOwnProperty('invite')){
                console.log('Under if') 
  
                        inviteObj=data.data().invite
                        this.setState({
                            inviteObj,
                            show:true
                        })
}
                   
                    
                })
               
            }

        })

    }

    agree(key){
        alert(`This Key(${key}) Enter on join Circle Page `)

    }


    render() {

        const {inviteObj ,show } = this.state;
        console.log(inviteObj)
        return (
            <ImageBackground
                style={styles.backgroundContainer} source={backImage}>
                            
                            <ScrollView scrollEventThrottle={16} >
 
 <View>
     <View style={styles.inviteCard}>
    {show ?
            <ListItem
              key={inviteObj.key}
              leftAvatar={{ source: { uri: 'https://cdn4.iconfinder.com/data/icons/people-std-pack/512/family-512.png' } }}
              title={inviteObj.name}
              subtitle="Invitation"
              rightTitle={
                  <View>
                      <MaterialCommunityIcons name="arrow-right-bold-hexagon-outline" size={32} color="#2b9077" />
                  </View>
              }
              onPress={() => this.agree(inviteObj.key)}
          />
     
      :
      <View style={styles.container}>
          <Text>"No Any Invitation"</Text>
      </View>
  }
         {/* {inviteArray.length ?
 
        inviteArray.map((l, i) => (
                 <ListItem
                     key={i}
                     leftAvatar={{ source: { uri: 'https://cdn4.iconfinder.com/data/icons/people-std-pack/512/family-512.png' } }}
                     title={l.name}
                     subtitle="Invitation"
                     rightTitle={
                         <View>
                             <MaterialCommunityIcons name="arrow-right-bold-hexagon-outline" size={32} color="#2b9077" />
                         </View>
                     }
                     onPress={() => this.agree(l.id)}
                 />
             ))
             :
             <View style={styles.container}>
                 <Text>"No Any Invitation"</Text>
             </View>
         } */}
     </View>


 </View>
</ScrollView >

                            

 
            </ImageBackground>
        );
    }
}
export default InvitationList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 150
    },
    inputContainer: {
        marginTop: 70
        
    },
    btn_text: {
        color: '#ffffff',
        fontSize: 25,
        textAlign: 'center',
        marginTop: -35

    },
    cirlcle_icon: {
        marginTop: 10,
        marginLeft: 10,
        color: '#ffffff',

    },
    btn: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: "#0693cc",
        justifyContent: 'center',
        marginTop: 20,
        opacity: 0.8
    }
    ,
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: "#eaf2ff",
        color: "#0693cc",
        marginHorizontal: 25

    }
    ,
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center'
    }
    ,
    logo: {
        width: 80,
        height: 80,
        opacity: 0.7,

        backgroundColor: "transparent"
    },
    searchIcon: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    inviteCard:{
        width:300
    }
});