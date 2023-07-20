import React, { Component } from 'react';
import {View, ScrollView, Text, StyleSheet, StatusBar, Image} from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";
import {CGU_URL} from '../api/fabbAPI';
import {color, design} from '../util/util';

class CGU extends React.Component{
    constructor(props){
        super(props);
        this.state={isConnected:false}
    }
    render(){
        return(
            <SafeAreaView style={[{flex:1, position:'relative', backgroundColor: color.mine.divider}]}>
                <StatusBar barStyle="light-content" backgroundColor={color.mine.dark_1} />
                {this._displayWebView()}
            </SafeAreaView>
        )
    }
    componentDidMount(){
        // Subscribe
        netWorkListner = NetInfo.addEventListener(state => {
            if(state.type=='wifi' || state.type=='cellular' || 1)
            this.setState({isConnected:true}); 
            /* getAgencesFromApi().then(data=>{
                this.setState({isConnected:false});
            }).catch((response)=>console.log(response));   */
        });
             
    }    
    _displayWebView(){
        if(!this.state.isConnected)
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>Pas de connexion internet</Text>
            </View>
        )
        return(
            <WebView
                // source={(this.state.isConnected)?{uri:CGU_URL}:{html:''}}
                source={{uri:CGU_URL}}
                style={{ flex:1}}
                originWhitelist={["*"]}
                useWebKit />
        )
    }
}

const styles=StyleSheet.create({
    view_main:{padding:20},
    view_main_indicator:design.view_main_indicator,
    textInput:design.form.textInput,
    frmLbl:design.form.label,
    fldIcon:design.form.icon 
});
export default CGU;