import React from 'react';
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import ItineraireItem from './ItinerairesItem';
import {color} from '../util/util';
import InputTypeButton from './elements/InputTypeButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LOGO_URL} from '../api/fabbAPI';
class AgencesItem extends React.Component{
    constructor(props){
        super(props);
        this.state={ isOpen:true }
    }
    render(){
        return(
            <View  style={styles.view_main}>
                <TouchableOpacity onPress={()=>{ this.setState({isOpen:!this.state.isOpen}); }} style={styles.view_agence}>
                    {/* <View  style={[styles.view_agence_img, {padding:2}]}>
                        <Image source={{uri:LOGO_URL+this.props.agence.logoAgence}} style={[{height:56, width:56, borderRadius:50}]} />
                    </View> */}
                    <View  style={[styles.view_agence_img, {padding:2}]}>
                        {
                            (this.props.agence.logoAgence=='logo.png')
                                ? <Image source={require('../asset/logo.png')} style={styles.img_agence} />
                                : <Image source={{uri:LOGO_URL+this.props.agence.logoAgence}} style={styles.img_agence} />
                        }
                    </View>
                    {/* <Image source={{uri:LOGO_URL+this.props.agence.logoAgence}} style={[styles.view_agence_img, {height:52, width:52}]} /> */}
                    <Text style={[styles.view_agence_txt_1, {fontWeight:'normal', fontSize:14, textTransform:'capitalize'}]}>
                        {this.props.agence.nomAgence}
                    </Text> 
                    {this._changeArrow(color.mine.primary, color.mine.primary)}
                </TouchableOpacity>
                {this._displayItineraireList(this.props.openReservationFrm)}
                {this._displaySeperator("#aaa", "85%", 5)}
                {/* <View style={{height:1, backgroundColor:'#aaa', width:'85%', margin:5}} /> */}
            </View>
        )
    }
    _changeArrow(color, color_1){
        return this.state.isOpen
            ? <Icon name="chevron-down-circle" color='#999'size={24} style={{marginRight:32}} />
            : <Icon name="chevron-up-circle" color={color_1} size={24} style={{marginRight:32}} />
    }
    _displaySeperator(color, size, marge){
        if(this.state.isOpen)
        return (<View style={{height:0.5, backgroundColor:color, width:size, margin:marge}} />)
        return null;
    }
    _displayItineraireList(openFrm){
        if(!this.state.isOpen){
            return(
                <View style={styles.view_itineraire}>
                    <InputTypeButton 
                        label="Faites une réservation" 
                        design={{ input:styles.btnInput, label: { color: '#fff' } }}
                        onSubmit={()=>{openFrm(this.props.agence.idAgence, 0, 0, 0, 0, 0)}}/>
                    <FlatList style={styles.view_itineraire_list}
                        data={this.props.agence.places}
                        keyExtractor={(item)=>item.idVue.toString()}
                        renderItem={({item})=><ItineraireItem agence={this.props.agence.idAgence} itineraire={item} openReservationFrm={openFrm}/>}
                    />
                </View>
            )
        }
        return null;
    }
}

const styles=StyleSheet.create({
    view_main:{
        flex:1, 
        flexDirection:'column', 
        alignItems:'center', 
        borderBottomWidth:0, 
        borderColor:color.darkBorder, 
        backgroundColor:color.lightBlack
    },
    view_agence:{
        flex:1, 
        width:'100%', 
        flexDirection:'row', 
        alignItems:'center', 
        paddingVertical:8, 
        paddingHorizontal:10
        /* , shadowRadius:2, shadowOpacity:0.65, shadowColor:'#000', marginBottom:0 */
    },
    view_agence_img:{margin:5, marginRight:20, backgroundColor:'transparent'},
    view_agence_txt_1:{flex:1, color:'#333'},
    view_agence_txt_2:{width:30},
    view_itineraire:{flex:1, flexDirection:'column', width:'100%'},
    view_itineraire_btn_add:{height:50},
    view_itineraire_list:{flex:1},
    img_agence:{flex:0, resizeMode:'cover', height:72, width:70, borderRadius:65},
    btnInput:{
        backgroundColor: color.mine.dark, 
        borderColor:'#ccc', 
        borderBottomWidth:2.2, 
        paddingVertical:18, 
        color:'#fff'
    }
});
export default AgencesItem;