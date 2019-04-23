import React, { Component }  from 'react';
import {TouchableOpacity, View ,StyleSheet, Platform, SafeAreaView , ScrollResponderMixin, Dimensions ,Image}
 from 'react-native';
import {createDrawerNavigator, createStackNavigator, createBottomTabNavigator,DrawerItems} from 'react-navigation';
import DashboardScreen from '../screens/Dashboard/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import createCircle from '../screens/createCircle/createCircle';
import joinCircle from '../screens/joinCircle/joinCircle';
import signOut from '../screens/signOut/signOut';
import myCircle from '../screens/myCircle/myCircle';
import viewCircle from '../screens/viewCircle/viewCircle';
import InviteUser from '../screens/InviteUser/InviteUser';
import InvitationList from '../screens/InvitationList/InvitationList';
import { ScrollView } from 'react-native-gesture-handler';
import logo from '../assets/groupslogo2.jpg'
import { green } from 'ansi-colors';

const {width}= Dimensions.get('window')


const customDrawerComponent = (props)=>{
return(<SafeAreaView style={styles.droidSafeArea}>
    <View style={{height:100}}>
    <Image source={logo} style={styles.logo_image}/>
    </View>
    <ScrollView>
        <DrawerItems {...props}/>
    </ScrollView>
    
    </SafeAreaView>)
}
const AppTabNavigator = createBottomTabNavigator({
    MyCircles: {
    screen:myCircle,
    navigationOptions: {
        title: 'Dashboard',
        headerTitleStyle: {
            marginLeft: 50,
            color: "#fff"
        },
        headerStyle: {
            backgroundColor: '#0693cc'
          },
        tabBarLabel:"Connected Circle",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="group" size={30} color="#0693cc" />
          ),
        tabBarOptions: { activeTintColor:'#0693cc', },
      },
    },
    // Offer: Offers,
    Map: {
    screen:viewCircle,
    navigationOptions: {
        tabBarLabel:"View Map",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="google-maps" size={40} color="#0693cc" />
        ),
        tabBarOptions: { activeTintColor:'#0693cc', },
      },
    },
    // Map: Map,
    // Category: Category,
    // Chat: Chat,
    // UserProfile: UserProfile,
    // Offer:Offers
})

const AppStackNavigator = createStackNavigator({
    circle: {
        screen: AppTabNavigator,
        navigationOptions: ({navigation}) => ({
            title: 'Conected Circle',
                headerTitleStyle: {
                    marginLeft: 40,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#0693cc'
                  },
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <View style={{paddingHorizontal: 10}}> 
                        <Icon name="md-menu" size={24} />
                    </View>
                </TouchableOpacity>
            )
        })
    }

})

const AppDrawerNavigator = createDrawerNavigator({
    

    Mycircle: AppStackNavigator,
    Map: createStackNavigator({
        circle: {
            screen: viewCircle,
            navigationOptions: ({navigation}) => ({
                title: 'Map',
                headerTitleStyle: {
                    marginLeft: 50,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#0693cc'
                  },
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-menu" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }),

    Dashboard: createStackNavigator({
        Dashboard: {
            screen: DashboardScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Dashboard',
                headerTitleStyle: {
                    marginLeft: 50,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#0693cc'
                  },
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-menu" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }),

    circle: createStackNavigator({
        circle: {
            screen: createCircle,
            navigationOptions: ({navigation}) => ({
                title: 'Create a Circle',
                headerTitleStyle: {
                    marginLeft: 50,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#0693cc'
                  },
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-arrow-round-back"  color="#fff" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        },
    }),
    Invitation: createStackNavigator({
        Invitation: {
            screen: InvitationList,
            navigationOptions: ({navigation}) => ({
                title: 'Invitation List',
                headerTitleStyle: {
                    marginLeft: 50,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#0693cc'
                  },
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-arrow-round-back"  color="#fff" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        },
    }),

    
    

    joinCircle: createStackNavigator({
        circle: {
            screen: joinCircle,
            navigationOptions: ({navigation}) => ({
                title: 'Join a Circle',
                headerTitleStyle: {
                    marginLeft: 50,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#0693cc'
                  },
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-arrow-round-back"  color="#fff" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }),
    InviteUser:createStackNavigator({
        InviteUser: {
            screen: InviteUser,
            navigationOptions: ({navigation}) => ({
                title: 'Invite User',
                headerTitleStyle: {
                    marginLeft: 50,
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: '#0693cc'
                  },
                headerLeft:(
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <View style={{paddingHorizontal: 10}}> 
                            <Icon name="md-menu" size={24} />
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    })
    ,
    SignOut: signOut,

    

},
{contentComponent:customDrawerComponent,
drawerWidth:width-180,
contentOptions:{
    // activeTintColor:'orange'
}
}

);

// const AppTabNavigator = createBottomTabNavigator({
//     Dashboard: DashboardScreen,
//     HomeScreen: HomeScreen,
// })

// const AppStackNavigator = createStackNavigator(
//     {
//     Dashboard: {screen: DashboardScreen,
//         navigationOptions: ({ navigation }) => ({
//             title: 'App',
//             headerTitleStyle: {
//                 marginLeft: 100,
//             },
//             headerLeft: (
//                 <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//                     <View style={{ paddingHorizontal: 10 }}>
//                         <Icon name="md-menu" size={24} />
//                     </View>
//                 </TouchableOpacity>
//             )
//         })
//     },
//     HomeScreen: HomeScreen,
//     },
//     {
//         DefaultNavigationOptions: ({ navigation }) => ({
//             title: 'App',
//             headerTitleStyle: {
//                 marginLeft: 100,
//             },
//             headerLeft: (
//                 <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//                     <View style={{ paddingHorizontal: 10 }}>
//                         <Icon name="md-menu" size={24} />
//                     </View>
//                 </TouchableOpacity>
//             )
//         })
//     }

// )



export default AppDrawerNavigator;

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        // backgroundColor: npLBlue,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    logo_image:{
        width:100,
        height:100,
        alignItems:"center",
        justifyContent:"center",
        
    }
});