import React from 'react';
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {color} from '../util/util';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class DotMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={ isOpen:false }
    }
    render(){
        // console.log(this.props);
        return(
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                <Text style={[styles.title, {color:this.props.options.headerTintColor}]}>FABB</Text>
                <View style={{flex:1, alignItems:'flex-end'}}>
                    {this._displayDotOrNot()}
                </View>
            </View>
        );
    }
    _displayDotOrNot(){
		if(!this.props.displayMenu) return(
            <TouchableOpacity 
                onPress={()=>{this.props.toogleMenuOverlay(1); this.setState({isOpen:!this.state.isOpen});}}>
                <Icon name="dots-vertical" color={this.props.options.headerTintColor} size={36} style={{marginRight:0}} />
            </TouchableOpacity>
        );
    }
}

const styles=StyleSheet.create({
    title:{flex:2, fontWeight:'bold', fontSize:22,textShadowColor:'#999', textShadowOffset:{width:0, height:0}, textShadowRadius:3}
});
export default DotMenu;