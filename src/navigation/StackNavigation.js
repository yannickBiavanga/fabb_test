import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigation';
import Reservation from '../components/Reservation';
import { color } from '../util/util';

const FabbStackNavigator = createStackNavigator()
function StackNavigation() {
    return (
        <NavigationContainer>
            <FabbStackNavigator.Navigator
                initialRouteName="Agence"
                screenOptions={{
                    headerStyle: { backgroundColor: color.lightLightBlack, borderBottomWidth: 0, shadowOpacity: 0 },
                    headerTintColor: '#333',
                    headerTitleStyle: { fontWeight: 'normal' },
                }}
            >
                <FabbStackNavigator.Screen
                    name="agence"
                    component={TabNavigator}
                    options={{ title: "FABB" }} 
                />
                <FabbStackNavigator.Screen
                    name="reservation"
                    component={Reservation}
                    options={{ title: "Réservation" }} 
                />
            </FabbStackNavigator.Navigator>
        </NavigationContainer>
    )
}
export default StackNavigation;