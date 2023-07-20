import React from 'react';
import { TextInput, View, Text, StyleSheet, ActivityIndicator, ScrollView, StatusBar, Image, Dimensions, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { connect } from 'react-redux';
import { getDate, getTime } from '../util/util';
import InputTypeButton from './elements/InputTypeButton';
import InputClient from './elements/InputClient';
import Select from './elements/Select';
import { getAgencesDataFromApi, sendReservationData, getImgBillet, BASE_URL } from '../api/fabbAPI';
import Passager from './Passager';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { color, design } from '../util/util';
import InputTypeDate from './elements/InputTypeDate';

class Inscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            frmStep: 0,
            haveDone: (typeof this.props.profil !== "undefined" && this.props.profil !== null)
        }
        this.form = {
            client: { id: 0, sexe: 1, nom: '', prnom: '', ddn: 0, tel: '', cin: '' }
        }

    }
    render() {
        return (
            <SafeAreaView style={[{ flex: 1, position: 'relative' }, { backgroundColor: color.mine.divider }]}>
                <StatusBar barStyle="light-content" backgroundColor={color.mine.dark_1} />
                <View style={styles.view_main}>
                    {/* <InputClient
                        values={this.form.client} 
                        getValues={(mClient)=>{this.form.client=mClient;}} /> */}
                    {this.displayFrmPart()}
                    {/* <InputTypeButton 
                        label={(this.state.frmStep<4)?"étape suivante":"Créer mon compte" }
                        design={{borderRadius:5, color: '#fff', backgroundColor:color.mine.dark, borderColor:color.mine.dark, borderWidth:1, marginTop:10, padding:0, label:{color:'#fff'}}} 
                        onSubmit={this._sendFrm} /> */}
                </View>
                {this._displayActivityIndicator()}
            </SafeAreaView>
        )
    }
    _displayActivityIndicator() {
        if (this.state.isLoad) return (
            <View style={styles.view_main_indicator}>
                <ActivityIndicator size="large" color={color.mine.dark} />
            </View>
        )
    }
    _sendFrm = () => {
        //affiche loader
        // this.setState({isLoad:true});  
        //charger le client
        if (this.state.frmStep < 4) this.setState({ frmStep: 1 + this.state.frmStep });
        else
            if (this.form.client.nom.length == 0 || this.form.client.tel.length == 0) alert('Err: champs invalident');
            else {
                // this.setState({isLoad:false, haveDone:true}); 
                this.setState({ haveDone: true });
                this._addProfil('mon_compte', { id: 0, sexe: this.form.client.sexe, nom: this.form.client.nom, prnom: this.form.client.prnom, ddn: this.form.client.ddn, tel: this.form.client.tel, cin: this.form.client.cin, imei: 0 });
                // this.props.navigation.goBack();
                this.props.navigation.goBack();
            }
    }
    _addProfil(name, data) {
        const action = { type: 'ADD_PROFIL', value: { id: name, value: data } };
        this.props.dispatch(action);
    }

    displayFrmPart() {
        switch (this.state.frmStep) {
            case 0:
                return (
                    <View style={{ flex: 1 }}>
                        <Text style={styles.frmLbl}>Sexe</Text>
                        <View style={[styles.view, { flex: 1 }]}>
                            <Select
                                placeholder={{ label: '-- Sexe --', value: -1 }}
                                items={[{ label: 'Homme', value: 1 }, { label: 'Femme', value: 0 }]}
                                ext={1}
                                minStyle={true}
                                getValue={(value) => { this.form.client.sexe = value; }} />
                        </View>
                        <InputTypeButton
                            label={(this.state.frmStep < 4) ? "étape suivante" : "Créer mon compte"}
                            design={{ input:styles.btnInput, label: { color: '#fff' } }}
                            onSubmit={() => { this.setState({ frmStep: 1 + this.state.frmStep }); }} />
                    </View>);
            case 1:
                return (
                    <View style={{ flex: 1 }}>
                        <Text
                            style={styles.frmLbl}>Votre nom:</Text>
                        <View style={[styles.view, { flex: 1 }]}>
                            <TextInput
                                accessibilityLabel="Entrez votre nom"
                                placeholderTextColor={color.mine.textGray}
                                autoCapitalize="characters"
                                style={styles.textInput}
                                placeholder="MBOTA"
                                onChangeText={(value) => { this.form.client.nom = value; }} />
                        </View>
                        <InputTypeButton
                            label={(this.state.frmStep < 4) ? "étape suivante" : "Créer mon compte"}
                            design={{ input:styles.btnInput, label: { color: '#fff' } }}
                            onSubmit={() => {
                                if (this.form.client.nom.trim().length > 0) this.setState({ frmStep: 1 + this.state.frmStep });
                                else alert('err nom client');
                            }} />
                    </View>);
            case 2:
                if (this.form.client.nom.length == 0) this.setState({ frmStep: 1 });
                else
                    return (
                        <View style={{ flex: 1 }}>
                            <Text
                                style={styles.frmLbl}>Votre pr&eacute;nom:</Text>
                            <View style={[styles.view, { flex: 1 }]}>
                                <TextInput
                                    accessibilityLabel="Entrez votre prénom"
                                    placeholderTextColor={color.mine.textGray}
                                    autoCapitalize="words"
                                    style={styles.textInput}
                                    placeholder="Luis Carlos"
                                    onChangeText={(value) => { this.form.client.prnom = value; }} />
                            </View>
                            <InputTypeButton
                                label={(this.state.frmStep < 4) ? "étape suivante" : "Créer mon compte"}
                                design={{ input:styles.btnInput, label: { color: '#fff' } }}
                                onSubmit={() => { this.setState({ frmStep: 1 + this.state.frmStep }); }} />
                        </View>);
                break;
            case 3:
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <InputTypeDate
                                parDefaut={(new Date()).getTime()}
                                getValue={(value) => { this.form.client.ddn = value; console.log(moment.utc(value).utcOffset('+00:00').format('ddd, DD MMMM YYYY')); }}
                                label={{ text: "Date de naissance", design: styles.frmLbl }}
                                design={{ textInput: styles.dateInput }} />
                        </View>
                        <InputTypeButton
                            label={(this.state.frmStep < 4) ? "étape suivante" : "Créer mon compte"}
                            design={{ input:styles.btnInput, label: { color: '#fff' } }}
                            onSubmit={() => {
                                if (this.form.client.ddn < (new Date()).getTime()) this.setState({ frmStep: 1 + this.state.frmStep });
                                else alert('err date de naissance du client');
                            }}
                        />
                    </View>);
            case 4:
                if (this.form.client.ddn == 0) this.setState({ frmStep: 3 });
                else return (<View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={styles.frmLbl}>Votre t&eacute;l&eacute;phone</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.view]}>
                                <TextInput
                                    accessible={false}
                                    editable={false}
                                    value="+242"
                                    style={styles.textInput} />
                            </View>
                            <TextInput
                                accessibilityLabel="Entrez votre téléphone"
                                placeholderTextColor={color.mine.textGray}
                                inputMode="tel"
                                keyboardType="phone-pad"
                                maxLength={15}
                                style={[styles.textInput, {flex:1}]}
                                placeholder="012345678"
                                onChangeText={(value) => { this.form.client.tel = value; }} />
                        </View>
                    </View>
                    <InputTypeButton
                        label={(this.state.frmStep < 4) ? "étape suivante" : "Créer mon compte"}
                        design={{ input:styles.btnInput, label: { color: '#fff' } }}
                        onSubmit={this._sendFrm}
                    />
                </View>);

            default:
                return null;
        }
    }
}
const styles = StyleSheet.create({
    view_main: { padding: 20, flex: 1 },
    view_main_indicator: design.view_main_indicator,
    frmLbl: design.form.label,
    fldIcon: design.form.icon,
    dateInput: {
        ...design.form.textInputProfil,
        borderWidth:0, 
        paddingLeft:10, 
        borderBottomWidth:0.5, 
        borderRadius:0, 
        backgroundColor:'transparent'
    },
    textInput:{ 
        ...design.form.textInputProfil, 
        flex: 0, 
        paddingLeft: 10, 
        borderWidth: 0, 
        borderBottomWidth: 0.5, 
        width: 'auto', 
        borderTopRightRadius: 0, 
        borderRadius: 0,
        borderBottomRightRadius: 0, 
        borderRightWidth: 0, 
        backgroundColor: 'transparent', color: '#000'
    },
    btnInput:{
        borderRadius: 5, 
        color: '#fff', 
        backgroundColor: color.mine.dark, 
        borderColor: color.mine.dark, 
        borderWidth: 1, 
        marginTop: 10, 
        padding: 0
    }
});
const mapStateToProps = (globalState) => {
    return { profil: globalState.toogleProfil.profil }
}
export default connect(mapStateToProps)(Inscription);
// export default Inscription;