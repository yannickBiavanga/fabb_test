import React, { Component, useState } from 'react';
import { Image, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


function Billet(props){ console.log(props.route.params.adrs);

    // const [image, setImage]=useState({ uri: 'file://'+props.route.params.adrs, scale:1});

    React.useEffect(
        ()=>props.navigation.addListener('beforeRemove', (e)=>{
            e.preventDefault();
            props.navigation.navigate('historique');

        })
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
            <StatusBar barStyle="light-content" hidden={true} />
            <Image style={{flex:1, width:'100%', height:'100%', resizeMode:'stretch'}}
                source={{ uri: 'file://'+props.route.params.adrs, scale:1}} 
                onError={(error)=>{console.log('err load image billet:'+error.toString());}} />
        </SafeAreaView>
    );

}
/* useFocusEffect(
    React.useCallback( ()=>{

        return ()=>{

            this.props.navigation.navigate('historique');
        }
    })
); */
/* class Billet extends React.Component{

    constructor(props){ super(props)}

    render(){
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
                
                <Image style={{flex:1, width:'100%', height:'100%', resizeMode:'stretch'}}
                    source={{ uri: 'file://'+this.props.route.params.adrs, scale:1}} />           
            </SafeAreaView>
        );
    }
} */

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
export default Billet;