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
class InviteUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userArr: [],
            userName: '',
            searchUser: [],
            nameLength: 0,
            admin: [],
            adm:'',
            group:false,
            listGroup:'',
            currentUserName:''
        }
        this.searchUserFunction = this.searchUserFunction.bind(this);
    }


    async componentDidMount() {
       
        
    }

     componentWillMount(){
        this.getAllCircleAndUser();
    }

   async getAllCircleAndUser(){
        const { userArr  ,admin} = this.state
        let {listGroup} = this.state 
        const db = firebase.firestore();
        const user = await AsyncStorage.getItem("userToken");

        db.collection('users').get().then(res => {

            if (res.size) {
                res.docs.forEach(data => {
                    const obj = {}
                    obj.id=data.id
                    obj.uid = data.data().uid
                    obj.name = data.data().name
                    obj.url = data.data().url
                    userArr.push(obj)
                    // this.setState({uid: data.data().uid, name: data.data().name, img: data.data().url, lat: data.data().latitude, lon: data.data().longitude});

                })
                this.setState({
                    userArr
                })
            }

        })

        db.collection("circle").where("uid", "==", user).onSnapshot(res => {
            this.setState({ admin: [] })
            
            if (res.docs.length) {
                res.docs.forEach(d => {
                    var e = { id: d.id, name: d.data().circle ,key:d.data().key}
                    this.setState({ admin: [...this.state.admin, e], adm: '', group: true ,currentUserName:d.data().name })
                })
                
           
        
            } else {

                this.setState({ adm: 'You do not have any group admin of circle yet' })
            }
        })
    }
    searchUserFunction(name) {
        const { userArr } = this.state
        let {searchUser } = this.state
        searchUser=[]
        this.setState({
            nameLength: name.length
        })
        if (name.length) {
            userArr.map((user,i)=>{
                matchString= user.name.toLowerCase().search(name.toLowerCase())
                {!matchString && searchUser.push(user)}
                this.setState({
                    searchUser
                })
        }
        )

        }

    }


    async invite(uid,id) {
        const { currentUserName , admin} = this.state
        let {listGroup} = this.state
console.log(currentUserName)
        if(listGroup=='' && admin.length){
            listGroup=admin[0]
            console.log(admin[0])
            console.log('listGroup',listGroup)

        }
        const db = firebase.firestore();
        const user = await AsyncStorage.getItem("userToken");
        var userRef = db.collection("users").doc(id);
        if(admin.length){
            {(uid == user) ? alert("You can not invite it to yourself")  : 
            userRef.get().then((doc)=> {
                if (doc.exists) {
                    console.log("Document data:", doc.data().token);
                    fetch('https://exp.host/--/api/v2/push/send',{
                        method:'POST',
                        headers:{
                            Accept:'application/json',
                            'content-type': 'application/json'
                        },
                        body:JSON.stringify({
                            to:doc.data().token, 
                            sound:'default',
                            title:'Invitation',
                            body:`${currentUserName} is invite to group is ${listGroup.name}`
                        })
                    }).then((res)=>{
                            alert('Sucssesfully Send request')
                    })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function() {
                console.log("Error getting document:", error);
            });  
    
            db.collection("users").doc(id).update({invite: listGroup})
            
        }
        
        }
        else{
            alert('you have no any circle')
        }
       
       
        


    }


    render() {

        const { username, userArr, searchUser, nameLength , admin } = this.state;
        let {listGroup}= this.state
        
        console.log('listGroup user=========>',listGroup)
        
        return (
            <ImageBackground
                style={styles.backgroundContainer} source={backImage}>

                <View style={styles.container}>
                    <View style={styles.pikers}>
                    <Picker
  selectedValue={listGroup}
  style={{ height: 50, width: 200}}
  onValueChange={(itemValue, itemIndex)=> this.setState({listGroup: itemValue})}>
                {admin.map((l,i)=>(
                //    console.log(l)
                   <Picker.Item label={l.name} value={l} key={l.key} />
                ))}
                </Picker>
</View>

                   
                    

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Search User...'}
                            placeholderTextColor={'#0693cc'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.searchUserFunction(text)}
                        />
                        <TouchableOpacity style={styles.searchIcon}>
                            <Ionicons name='md-search' size={24} />
                        </TouchableOpacity>
                            <View style={styles.userList}>
                        <ScrollView scrollEventThrottle={16} >
                                {nameLength ?

                                    searchUser.map((l, i) => (
                                        <ListItem
                                            key={i}
                                            leftAvatar={{ source: { uri: l.url } }}
                                            title={l.name}
                                            subtitle="user"
                                            rightTitle={
                                                <View>
                                                    <MaterialCommunityIcons name="arrow-right-bold-hexagon-outline" size={32} color="#2b9077" />
                                                </View>
                                            }
                                            onPress={() => this.invite(l.uid,l.id)}
                                        />
                                    ))
                                    :
                                    userArr.map((l, i) => (
                                        <ListItem
                                            key={i}
                                            leftAvatar={{ source: { uri: l.url } }}
                                            title={l.name}
                                            rightTitle={
                                                <View> 
                                                    <MaterialCommunityIcons name="arrow-right-bold-hexagon-outline" size={32} color="#2b9077" />
                                                </View>
                                            }
                                            onPress={() => this.invite(l.uid,l.id)}
                                        />
                                    ))
                                }
                        </ScrollView>
                            </View>


                    </View>
                </View>
            </ImageBackground>
        );
    }
}
export default InviteUser;

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
        marginHorizontal: 25,
    


    },
    userList:{
        marginTop:10,
        height:200
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
    pikers:{
        width:200,
         marginTop:80,
       borderWidth:1,
       borderColor:"black",
       backgroundColor:"#fff"
    },

});