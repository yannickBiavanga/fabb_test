import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, StatusBar, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import moment from 'moment';
import AgencesItem from './AgencesItem';
// import DotMenu from './DotMenu_1';
import { getAgencesFromApi, getTicket, getImgBillet, clozSession } from '../api/fabbAPI';
import { color } from '../util/util';
class Agences extends React.Component {
    netWorkListner = null;
    constructor(props) {
        super(props);
        this.state = {
            isLoad: true,
            offLine: false,
            agences: []
        }
    }
    render() {
        // let data=(this.props.agences!='undefined' && this.props.agences.length>0)?this.props.agences:this.state.agences;
        let data = (this.props.agences != 'undefined') ? this.props.agences : this.state.agences;
        return (
            <SafeAreaView style={[{ flex: 1, position: 'relative' }, { backgroundColor: "#ececec" }]}>
                <StatusBar barStyle="light-content" backgroundColor={color.mine.dark_1} />
                {
                    (data.length == 0)
                        ?
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {(this.state.offLine) ? (<Text style={{ color: color.mine.TextDark }}>Erreur réseau</Text>) : null}
                            </View>
                        :
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.idAgence.toString()}
                                renderItem={({ item }) => <AgencesItem agence={item} openReservationFrm={this._openReservationFrm} />} 
                            />
                }
                {this._displayActivityIndicator()}
            </SafeAreaView>
        )
    }
    componentDidMount() {
        // Subscribe
        netWorkListner = NetInfo.addEventListener(state => {
            if (state.type == 'wifi' || state.type == 'cellular' || 1) {

                //init data
                getAgencesFromApi().then(json => {
                    this._getAgences((typeof json != 'undefined' && json != null) ? json.agences : []);
                    //close laoder
                    this.setState({ isLoad: false });

                    //voir les billets 
                    // getTicket().then(json => {
                    //     console.log(json);
                    //     if (typeof json !== 'undefined')
                    //         if (json.errs.length > 0) {
                    //             alert('error get ticket :' + json.errs[0]);
                    //         } else {
                    //             if (typeof json.recu != 'undefined' && json.recu.length > 0) {
                    //                 //verifier que ce billet nexiste pas deja
                    //                 if (this.props.historique.findIndex(item => item.value.adrs == json.recu[0].adrs) < 0)
                    //                     //le billet nexiste pas
                    //                     //sauvegarder le billet dans le phone
                    //                     getImgBillet(json.recu[0].name, json.recu[0].adrs).then(adrsLocalBillet => {
                    //                         //ajouter le billet a lhistorique
                    //                         this._addToHistorique(json.recu[0].name, { 
                    //                             adrs: json.recu[0].adrs, 
                    //                             ldd: json.recu[0].ldd, 
                    //                             lda: json.recu[0].lda, 
                    //                             ddd: json.recu[0].ddd, 
                    //                             hdd: json.recu[0].hdd, 
                    //                             idRes: json.recu[0].idRes,
                    //                             stateRes:1,
                    //                             dateRes: json.recu[0].dateRes, 
                    //                             agence: json.recu[0].agence, 
                    //                             adrsLocal: adrsLocalBillet, 
                    //                             report: 0 
                    //                         });

                    //                         Alert.alert(
                    //                             "Félicitation",
                    //                             "Votre voyage du " + moment.utc(json.recu[0].ddd * 1000).utcOffset('+00:00').format('ddd, DD MMMM YYYY') + " pour " + json.recu[0].ldd + "/" + json.recu[0].lda + " a bien été enregistré avec succès. Voir la section \"Mes billets\"",
                    //                             [{ text: "Fermer", onPress: () => console.log("Fermer") }]
                    //                         );

                    //                     }).catch((response) => alert('err get billet:' + response));

                    //                 //je ramene un billet donc tjrs 
                    //                 //detruire la session
                    //                 clozSession().then((json)=>console.log(json)).catch((response) => console.log(response));

                    //                 //ouvrir le component billet
                    //                 // this.props.navigation.navigate('billet', {adrs:adrsLocalBillet});

                    //             }
                    //         }

                    // }).catch((response) => alert('err send reservation:' + response));

                }).catch((response) => alert('err get agences:' + response));

            } else this.setState({ isLoad: false, offLine: true })
        });
    }
    componentWillUnmount() {
        // Unsubscribe
        netWorkListner();
    }
    _getAgences(data) {
        const action = { type: 'GET_AGENCES', value: data };
        this.props.dispatch(action);
    }
    _toogleToSession(name, data) {
        const action = { type: 'TOOGLE_SESSION', value: { id: name, value: data } };
        this.props.dispatch(action);
    }
    _addToHistorique(name, data) {
        const action = { type: 'ADD_BILLET', value: { id: name, value: data } };
        this.props.dispatch(action);
    }
    _displayActivityIndicator() {
        if (this.state.isLoad) return (
            <View style={styles.view_main_indicator}>
                <ActivityIndicator size="large" color={color.mine.dark} />
            </View>
        );
    }
    _openReservationFrm = (mAgence, mIdLdd, mLdd, mIdLda, mLda, mDdd, mHdd, mDda) => {
        /* this.props.navigation.navigate('resStackScreen', {
            
            screen:'reservation', 
            params:{agence:mAgence, idLdd:mIdLdd, ldd:mLdd, idLda:mIdLda, lda:mLda, ddd:mDdd, hdd:mHdd}
        }); */
        this.props.navigation.navigate('reservation', { agence: mAgence, idLdd: mIdLdd, ldd: mLdd, idLda: mIdLda, lda: mLda, ddd: mDdd, hdd: mHdd, dda: mDda });
    }
}

const styles = StyleSheet.create({
    view_main_indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00000033",
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0, zIndex: 500, opacity: 1
    }
});

const mapStateToProps = (globalState) => {
    return {
        agences: globalState.refreshAgences.agences,
        session: globalState.toogleSession.session,
        historique: globalState.toogleHistorique.historique

    }
    // return globalState;
}
export default connect(mapStateToProps)(Agences);
// export default Agences;