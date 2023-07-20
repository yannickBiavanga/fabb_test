import React from 'react';
// import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Agences from '../components/Agences';
import {Text} from 'react-native';
import {color} from '../util/util';

function Historique(){
    return (<Text>TOto</Text>);
}
const FabbTabNavigator=createBottomTabNavigator()
//const FabbTabNavigator= createMaterialTopTabNavigator();

function TabNavigator(){
    return(
        <FabbTabNavigator.Navigator
            tabBarOptions={
                {
                    activeTintColor:color.textTagActif,
                    inactiveTintColor:color.textTagInactif,
                    style:{ backgroundColor:color.lightLightBlack},
                    indicatorStyle:{ borderBottomWidth:2, borderBottomColor:'#449d44'}
                }
            }
        >
        <FabbTabNavigator.Screen 
            name="agence" 
            component={Agences}
            options={{
                title:"Agences", 
                tabBarIcon:(params)=><Icon name="home" color={params.color} size={params.size} />
            }}
        />
        <FabbTabNavigator.Screen 
            name="historique" 
            component={Historique} 
            options={{title:"Historique"}} 
        />
    </FabbTabNavigator.Navigator>

    )
}
export default TabNavigator;