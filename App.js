import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Touchable, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon_1 from 'react-native-vector-icons/Ionicons';
import Icon_2 from 'react-native-vector-icons/EvilIcons';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate} from 'redux-persist/es/integration/react';
import call from 'react-native-phone-call';

import store from './src/store/configureStore';
import CGU from './src/components/CGU';
import DotMenu from './src/components/DotMenu';
import Agences from './src/components/Agences';
import Reservation from './src/components/Reservation';
import Historique from './src/components/Historique';
import Billet from './src/components/Billet';
import Profil from './src/components/Profil';
import Inscription from './src/components/Inscription';
import Report from './src/components/Report';
// import DotMenu from './components/DotMenu';
import {color} from './src/util/util';

const Tab = createMaterialBottomTabNavigator();
function HomeTagScreen() {
	return (
		<Tab.Navigator
			initialRouteName="agence"
			activeColor={color.mine.primary}
			inactiveColor="#777"
			barStyle={{ backgroundColor: '#fff', marginHorizontal:'auto', paddingHorizontal:0, paddingVertical:0 }}
			labelStyle={{fontSize: 9}}>
			<Tab.Screen name="agence" component={Agences}
				options={{
				tabBarLabel: 'Agences',
				tabBarIcon: ({ color }) => (<Icon name="bus-multiple" color={color} size={22} />),
			}} />
			<Tab.Screen name="profil" component={Profil}
				options={{
				headerShown:false,
				tabBarLabel: 'Mon Compte',
				tabBarIcon: ({ color }) => (<Icon name="account" color={color} size={26} />),
				// tabBarIcon: ({ color }) => (<Icon_2 name="gear" color={color} size={30} />),
				// tabBarIcon: ({ color }) => (<Icon name="account" color={color} size={24} />),
			}} />
			<Tab.Screen name="historique" component={Historique}
				options={{
				tabBarLabel: 'Mes billets',
				tabBarIcon: ({ color }) => (<Icon name="archive" color={color} size={22} />),
			}} />
		</Tab.Navigator>
	);
}
const HomeStack = createStackNavigator();
const createThreeButtonAlert = () =>
Alert.alert(
  "Contact",
  "Tel: (+242) 069197584\nTel: (+242) 057973236\nEmail: ellipsetravel242@gmail.com",
  [
	{
	  text: "Appeler",
	  onPress: () => call({number:'+242069197584', prompt:false}).catch(console.error)
	},
	/* {
	  text: "Ecrir",
	  onPress: () => console.log("Cancel Pressed"),
	  style: "cancel"
	}, */
	{ text: "Fermer", onPress: () => console.log("Fermer") }
  ]
);	

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={ isOpen:false }
		this.displayMenu=0;
		this.cNavigation=null;
	}
	render(){
		let persistor = persistStore(store);

		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
				<SafeAreaProvider style={{position:'relative'}}>
					<NavigationContainer>
						<HomeStack.Navigator 
							initialRouteName="homeTagScreen"
							presentation= "modal"
							screenOptions={{headerStyle: {backgroundColor:color.mine.primary}, headerTintColor: '#ffffff'}}>
							<HomeStack.Screen 
								name="homeTagScreen" 
								component={HomeTagScreen}
								options={ 
									{
										title:"FABB",
										headerStyle: {
											height: 80, // Specify the height of your custom header
											padding: 20,
											backgroundColor:color.mine.primary
										},
										header: (props) => {
											this.cNavigation=props.navigation;
											return (
												<View style={props.options.headerStyle}>
													<DotMenu displayMenu={this.displayMenu} toogleMenuOverlay={this._toogleMenuOverlay} {...props} />
												</View>
											);
										}
									}
								} />
							<HomeStack.Screen name="reservation" component={Reservation} options={{title:'Réservation', headerTitleAlign:'center'}} />
							<HomeStack.Screen name="billet" component={Billet} options={{headerShown:false}} />
							<HomeStack.Screen name="report" component={Report}  options={{title:'Report', headerTitleAlign:'center'}} />
							<HomeStack.Screen name="inscription" component={Inscription}  options={{title:'Inscription', headerTitleAlign:'center'}} />
							<HomeStack.Screen name="cgu" component={CGU}  options={{title:'CGU', headerTitleAlign:'center'}} />
						</HomeStack.Navigator>
						{this._displayDotMenu()}
					</NavigationContainer>
				</SafeAreaProvider>
				</PersistGate>
			</Provider>
		);
	}
	_displayDotMenu(){
		if(this.state.isOpen)
		return (<TouchableOpacity onPress={()=>this._toogleMenuOverlay(0)} style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', zIndex:1000, backgroundColor:'rgba(0, 0, 0, 0)'}}>
			<View style={{width:150, backgroundColor:'#fff', position:'absolute', top:3, right:3, borderRadius:5, borderWidth:0.5, borderColor:'#ececec'}}>
				<TouchableOpacity 
					onPress={()=>{this._toogleMenuOverlay(0); this.cNavigation.navigate('cgu');}} 
					style={{flex:1, paddingTop:12, paddingBottom:12, paddingHorizontal:14}}>
                    <Text style={{color:'#333333'}}>CGU</Text>
                </TouchableOpacity>
                <TouchableOpacity 
					onPress={()=>{this._toogleMenuOverlay(0); createThreeButtonAlert();}}
					style={{flex:1, paddingTop:12, paddingBottom:12, paddingHorizontal:14}}>
                    <Text style={{color:'#333333'}}>Contact</Text>
                </TouchableOpacity>
            </View>
		</TouchableOpacity>);
	}
	_toogleMenuOverlay=(mParam)=>{
		this.setState({isOpen:mParam}); 
		this.displayMenu=mParam;
	}
	_myRoute=(mNav)=>{theNavigation=mNav}
}
const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default App;