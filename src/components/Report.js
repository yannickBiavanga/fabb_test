import React from 'react';
import {TextInput, View, Text, StyleSheet, ActivityIndicator, ScrollView, StatusBar, Image, Dimensions, ImageBackground} from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import InputTypeButton from './elements/InputTypeButton';
import {reportReservation,  getImgBillet, delImgBillet} from '../api/fabbAPI';
import {color, design} from '../util/util';
import InputTypeDate from './elements/InputTypeDate';

class Report extends React.Component{
    
    constructor(props){
        super(props);
        this.state={ isLoad:false}
        this.idBillet=this.props.route.params.idBillet;
        this.form={
            idRes:(typeof this.props.route.params.idRes=="undefined")?0:this.props.route.params.idRes,
            ddd:(typeof this.props.route.params.ddd=="undefined")?0:this.props.route.params.ddd
        };
    }
    render(){
        return(
            <SafeAreaView style={[{flex:1, position:'relative'}, { backgroundColor: color.mine.divider }]}>
            <StatusBar barStyle="light-content" backgroundColor={color.mine.dark_1} />
                <View style={styles.view_main}>
                    <View style={{flex:1}}>
                        <InputTypeDate
                            parDefaut={this.form.ddd}
                            getValue={(value)=>{
                                this.form.ddd=value;
                                this.form.hdd=(new Date(value).getUTCHours()*3600+new Date(value).getUTCMinutes()*60)*1000}}
                            type="datetime"
                            label={{text:"Date du report:", design:styles.frmLbl}}
                            design={{textInput:{borderWidth:0, paddingLeft:10, borderBottomWidth:0.5, borderRadius:0, backgroundColor:'transparent'}}} />
                    </View>
                    <InputTypeButton 
                        label="Reporter ma réservation"
                        design={{ input:styles.btnInput, label: { color: '#fff' } }}
                        onSubmit={this._sendFrm} />
                </View>
                {this._displayActivityIndicator()}
            </SafeAreaView>
        )
    }
    _displayActivityIndicator(){
        if(this.state.isLoad) return(
            <View style={styles.view_main_indicator}>
                <ActivityIndicator size="large" color={color.mine.dark} />
            </View>
        )
    }
    _sendFrm=()=>{
        try {    
            if(typeof this.props.profil=='undefined' || this.props.profil==null) 
                throw new Error("Report impossible, vous devez avoir un compte");
            if(this.form.ddd==0 || this.form.ddd==this.props.route.params.ddd)
                throw new Error("Report impossible, invalide date");
            if(this.form.ddd-(new Date()).getTime()<0 || this.form.ddd-(new Date()).getTime()<3600*24*1000)
                throw new Error("Report impossible, report tardif 24h avant le départ:");
            //affiche loader
            this.setState({isLoad:true});
            reportReservation(this.form.idRes, this.form.ddd/1000, this.form.hdd/1000, this.props.profil.value)
            .then(json=>{
                //cache loader
                this.setState({isLoad:false});
                if (typeof json !== 'undefined')
                if(json.errs.length>0) throw new Error('error send form :'+json.errs[0]);
                else if(typeof json.recu!='undefined' && json.recu.length>0){
                    //refresh agence
                    this._refreshAgences(json.agences);
                    //supprimer le billet de lhistorique
                    this._delToHistorique(this.idBillet, null);
                    //del physiquement le billet avec nfs
                    delImgBillet(this.idBillet)
                    .then(()=>{
                        //ajouter le billet a lhistorique
                        //sauvegarder le billet dans le phone
                        getImgBillet(json.recu[0].name, json.recu[0].adrs)
                        .then(adrsLocalBillet=>{
                            //une fois le billet download
                            //maj le billet en attente
                            this._addToHistorique(json.recu[0].name, {adrs:json.recu[0].adrs, ldd:json.recu[0].ldd, lda:json.recu[0].lda, ddd:json.recu[0].ddd, hdd:json.recu[0].hdd, idRes:json.recu[0].idRes, dateRes:json.recu[0].dateRes, agence:json.recu[0].agence, adrsLocal:adrsLocalBillet, report:1});
                            //ouvrir le component billet
                            // this.props.navigation.navigate('billet', {adrs:adrsLocalBillet});
                            this.props.navigation.navigate('billet', {adrs:adrsLocalBillet}); })
                        .catch((response)=>{
                            /* //Ajouter un billet en attente de l'adrsLocale il permet au client davoir un billet 
                            //meme si limage du billet n'a pas pu etre download plus de credit ou autre
                            this._addToHistorique(json.recu[0].name, {adrs:json.recu[0].adrs, ldd:json.recu[0].ldd, lda:json.recu[0].lda, ddd:json.recu[0].ddd, hdd:json.recu[0].hdd, idRes:json.recu[0].idRes, dateRes:json.recu[0].dateRes, agence:json.recu[0].agence, adrsLocal:''}); */
                            alert('err get billet:'+response)
                        });
                    })
                    .catch((response)=>alert('err del billet:'+response));
                }})
            .catch((response)=>alert('err send reservation:'+response));

        }catch(error) {alert(error.name+":"+error.message); }        
    }
    _addToHistorique(name, data){
        const action={type:'ADD_BILLET', value:{id:name, value:data}};
        this.props.dispatch(action);
    } 
    _delToHistorique(name, data){
        const action={type:'DEL_BILLET', value:{id:name, value:data}};
        this.props.dispatch(action);
    }
    _refreshAgences(data){
        const action={type:'REFRESH_AGENCE', value:data};
        this.props.dispatch(action);
    }
    _majToHistorique(name, data){
        const action={type:'MAJ_BILLET', value:{id:name, value:data}};
        this.props.dispatch(action);
    } 
}
const styles=StyleSheet.create({
    view_main:{padding:20, flex:1/* , backgroundColor:'beige' */},
    view_main_indicator:design.view_main_indicator,
    textInput:design.form.textInput,
    frmLbl:design.form.label,
    fldIcon:design.form.icon,
    btnInput:{
        borderRadius:5, 
        color: '#fff', 
        backgroundColor:color.mine.dark, 
        borderColor:color.mine.dark, 
        borderWidth:1, 
        marginTop:10, 
        padding:0
    }
});
// export default Report;
const mapStateToProps=(globalState)=>{
    return{
      profil:globalState.toogleProfil.profil
    }
}
export default connect(mapStateToProps)(Report);