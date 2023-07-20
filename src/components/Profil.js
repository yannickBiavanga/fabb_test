import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, Alert, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import InputTypeButton from './elements/InputTypeButton';
import InputClient from './elements/InputClient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon_ant from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { color, design } from '../util/util';
class Profil extends React.Component {
    webView = null;

    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            haveDone: (typeof this.props.profil != "undefined" && this.props.profil != null)
        }
        this.form = {
            client: { id: 0, sexe: 1, nom: '', prnom: '', ddn: 0, tel: '', cin: '' }
        }
    }
    render() {
        return (
            <SafeAreaView style={[{ flex: 1, position: 'relative', backgroundColor: color.mine.divider }]}>
                <StatusBar barStyle="light-content" backgroundColor={color.mine.dark_1} />
                {/* <View style={{flex:1}}>
                    <View style={{flex:2, flexDirection:'row'}}>
                        <Image source={require('../asset/mayo_6.png')} style={{flex:1, resizeMode:'cover', width:'100%', height:'100%' }} />
                    </View>
                    <View style={{flex:3}}>
                        {this._displayFrm()}
                        {this._displayActivityIndicator()}
                    </View>
                </View> */}
                {this._displayFrm()}
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
    _displayFrm() {
        if (typeof this.props.profil != "undefined" && this.props.profil != null)
            return (
                <ScrollView style={{ flex: 1 }}>
                {/* profile data */}
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', padding: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginBottom: 10 }}>Compte</Text>
                        <View style={[styles.view_value, { paddingBottom: 15, backgroundColor: '#fff', position: 'relative' }]}>
                            <Icon name="account-outline" color={color.mine.primary} size={24} />
                            <View>
                                <Text style={[styles.text_value, { textTransform: 'uppercase' }]}>{this.props.profil.value.nom}</Text>
                                <Text style={[styles.text_value, { textTransform: 'capitalize', marginTop: 0 }]}>{this.props.profil.value.prnom}</Text>
                                <Text style={[styles.text_value, styles.frmLbl, { marginTop: 10, color: '#999' }]}>{/* Les noms et prénoms du client */}</Text>
                            </View>
                        </View>
                        <Text style={{ marginTop: 20, marginBottom: 10 }}>Paramètres</Text>
                        <View style={{ backgroundColor: '#fff' }}>
                            <View style={[styles.view_value, { alignItems: 'flex-start' }]}>
                                <Icon name="cake-layered" color={color.mine.primary} size={24} />
                                <View>
                                    <Text style={[styles.text_value, { alignItems: 'flex-start' }]}>{moment.utc(this.props.profil.value.ddn).utcOffset('+00:00').format('DD MMMM YYYY')}</Text>
                                    <Text style={[styles.text_value, styles.frmLbl, { marginTop: 10, color: '#999', display: 'none' }]}>{/* Profiter des réductions liées à votre age */}</Text>
                                </View>
                            </View>
                            <View style={styles.view_value}>
                                <Icon name="phone" color={color.mine.primary} size={24} />
                                <View>
                                    <Text style={styles.text_value}>+242 {this.props.profil.value.tel}</Text>
                                    <Text style={[styles.text_value, styles.frmLbl, { marginTop: 10, color: '#999', display: 'none' }]}>{/* Les factures seront adressées à ce numéro */}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* profil deconnexion button */}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderColor: 'blue', marginTop: 48 }}>
                    {/* <InputTypeButton
                    label="&#215;"
                    design={{ input: styles.btnInputRound, label: { color: '#fff', fontSize: 20 } }}
                    onSubmit={this._sendDelFrm} /> */}

                    <TouchableOpacity
                        accessibilityLabel="Bouton de déconnexion"
                        onPress={() => { this._sendDelFrm(); }}
                        style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 12, backgroundColor: 'orange', ...styles.btnInputRound }}>
                        {/* <Icon name="close-thick" color={color.mine.textLight} size={32} /> */}
                        <Icon name="account-remove" color={color.mine.textLight} size={32} />
                    </TouchableOpacity>

                    <Text style={[{ marginTop: 10, textTransform:'uppercase', fontSize:10, fontWeight:'600' }]}>Déconnexion</Text>
                </View>
                </ScrollView>
            );
        return (
            <View style={[styles.view_main, { flex: 1, padding: 0, margin: 0, justifyContent: 'center' }]}>
                <View style={[styles.view_main, { flex: 2, justifyContent: 'flex-start', justifyContent: 'center' }]}>
                    <View style={{ flex: 0, marginBottom: 20, alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
                        <Icon name="account-outline" color={color.mine.grayLight} size={145} style={[{ flex: 0 }]} />
                        {/* <Icon_ant name="meho" color={color.mine.grayLight} size={160} /> */}
                        <Text style={{ textAlign: 'center', color: color.mine.TextDark, fontSize: 12 }}>Inscrivez vous pour avoir un compte</Text>
                        <InputTypeButton
                            label="Inscription"
                            design={{ input: styles.btnInput, label: { color: '#fff' } }}
                            onSubmit={() => { this.props.navigation.navigate('inscription', { haveDone: this.state.haveDone }) }} />
                    </View>
                </View>
            </View>
        )
    }
    /* _sendFrm=()=>{
        //affiche loader
        // this.setState({isLoad:true});  
        //charger le client
        if(this.form.client.length==0 || this.form.client.prnom.length==0 || this.form.client.tel.length==0) alert('Err: champs invalident');
        else{         
            // this.setState({isLoad:false, haveDone:true}); 
            this.setState({haveDone:true}); 
            this._addProfil('mon_compte', {nom:this.form.client.nom, prnom:this.form.client.prnom, ddn:this.form.client.ddn, tel:this.form.client.tel, cin:this.form.client.cin});
        }
    } */
    _sendDelFrm = () => {
        //affiche loader
        this.setState({ haveDone: false });
        Alert.alert(
            "Supprimer profile",
            "Tous les paramètres liés à votre compte seront perdus, cliquez sur OK pour confirmer",
            [
                {
                    text: "OK",
                    onPress: () => { this._delProfil('mon_compte', null); }
                },
                { text: "Fermer", onPress: () => console.log("Fermer") }
            ]
        );
    }

    /* _addProfil(name, data){
        const action={type:'ADD_PROFIL', value:{id:name, value:data}};
        this.props.dispatch(action);
    } */
    _delProfil(name, data) {
        const action = { type: 'DEL_PROFIL', value: { id: name, value: data } };
        this.props.dispatch(action);
    }
}
const styles = StyleSheet.create({
    view_main: { padding: 0 },
    view_value: { flexDirection: 'row', borderWidth: 0, paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 0.5, borderColor: '#ccc' },
    text_value: { marginLeft: 10, fontSize: 15, color: '#333' },
    view_main_indicator: design.view_main_indicator,
    textInput: design.form.textInput,
    frmLbl: design.form.label,
    fldIcon: design.form.icon,
    btnInput: { borderRadius: 5, color: '#fff', backgroundColor: color.mine.dark, marginTop: 22, paddingHorizontal: 40 },
    btnInputRound: {
        borderRadius: 70,
        color: '#fff',
        backgroundColor: color.mine.dark,
        borderColor: 'red',
        borderWidth: 0.5, marginTop: 0, padding: 0, height: 70, width: 70
    }
});
const mapStateToProps = (globalState) => {
    return {
        profil: globalState.toogleProfil.profil

    }
}
export default connect(mapStateToProps)(Profil);
// export default connect()(Profil);