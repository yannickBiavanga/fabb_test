import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Agences from '../components/Agences';
import Reservation from '../components/Reservation';

const FabbStackNavigator=createStackNavigator()
function StackNavigation(){
    return(
        <NavigationContainer>
            <FabbStackNavigator.Navigator initialRouteName="Agence">
                <FabbStackNavigator.Screen name="Agence" component={Agences}></FabbStackNavigator.Screen>
                <FabbStackNavigator.Screen name="Réservation" component={Reservation}></FabbStackNavigator.Screen>
            </FabbStackNavigator.Navigator>
        </NavigationContainer>
    )
}
export default StackNavigation;