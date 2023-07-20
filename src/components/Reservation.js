import React from 'react';
import { TextInput, View, Text, StyleSheet, ActivityIndicator, ScrollView, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { getDate, getTime } from '../util/util';
import InputTypeButton from './elements/InputTypeButton';
import Select from './elements/Select';
// import Select from './elements/SelectSearch';
import InputTypeDate from './elements/InputTypeDate';
import { getAgencesDataFromApi, sendReservationData, getImgBillet, getTicket, saveTicket, confirmCmd, clozSession, BASE_URL } from '../api/fabbAPI';
import Passager from './Passager';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { color, design } from '../util/util';
// import WebView from 'react-native-webview';
class Reservation extends React.Component {
    webView = null;
    webViewLoadNbr = 0;

    constructor(props) {
        super(props);
        this.form = { client: null, passagers: [], ddd: (new Date()).getTime(), ldd: 0, lda: 0, hdd: 0 }
        //init client
        this.form.client = (typeof this.props.profil !== "undefined" && this.props.profil !== null)
            ? { ...this.props.profil.value }
            : null;
        //init passager
        this.form.passagers.push(
            (typeof this.props.profil !== "undefined" && this.props.profil !== null)
                ? { ...this.props.profil.value }
                : { id: 0, sexe: 1, nom: '', prnom: '', ddn: (new Date()).getTime(), tel: '', cin: '' }
        );
        //init ddd
        this.form.ddd = (typeof this.props.route.params.ddd !== "undefined" && this.props.route.params.ddd > 0)
            ? this.props.route.params.ddd * 1000
            : (new Date()).getTime();
        //init hdd
        this.form.hdd = (typeof this.props.route.params.hdd !== "undefined" && typeof this.props.route.params.hdd !== null)
            ? this.props.route.params.hdd
            : 0;
        //init ldd
        this.form.ldd = (typeof this.props.route.params.idLdd !== "undefined" && typeof this.props.route.params.idLdd !== null)
            ? this.props.route.params.idLdd
            : -1;
        //init data
        this.agence = this.props.route.params.agence;
        this.json_stations = [];
        this.view_stations = [];
        this.session = null;
        this.adrsPhysiqueBillet = null;
        this.state = { stations: [], horaires: [], isLoad: true, billetAdrs: '', haveDone: false, panier: null, cStation: this.form.ldd }
        //let t={a:1}; t.asig
    }
    render() {
        return (
            <SafeAreaView style={[{ flex: 1, position: 'relative' }, { backgroundColor: color.mine.divider }]}>
                <StatusBar barStyle="light-content" backgroundColor={color.mine.dark_1} />
                {this._displayFrm()}
                {this._displayActivityIndicator()}
            </SafeAreaView>
        )
    }
    componentDidMount() {
        //on entre ici dans deux cas
        //soit clique sur le btn donc id_agence sera send
        //soit clique sur itineraire item id_agence et id_station
        getAgencesDataFromApi(this.props.route.params.agence).then(json => {

            this.json_stations = json.agences[0].stations;
            this.view_stations = [];
            //construire la liste des stations
            this.json_stations.forEach(item => {
                this.view_stations.push({ label: item.codeStation + ' - ' + item.lblStation, value: item.idStation });
            });
            // console.log(this.json_stations);
            //update State
            this.setState({ isLoad: false })
        }).catch((response) => alert(response));
    }
    /* _initStations(){
        let stations=[];
        //construire la liste des stations
        this.json_stations.forEach(item => {
            stations.push({label:item.codeStation+' - '+item.lblStation, value:item.idStation});
        }); 
        return stations;
    } */
    _initHoraires(mIdStation) {
        if (this.json_stations.length == 0) return [];
        let horaires = [];
        //find current station
        let currentLdd = this.json_stations.findIndex(item => item.idStation == mIdStation);
        let cHoraires = (currentLdd < 0)
            ? this.json_stations[0].horaires
            : this.json_stations[currentLdd].horaires;

        //construire la liste des horaires
        cHoraires.forEach(item => {
            horaires.push({ label: getTime(item.valeurHoraire * 1), value: (item.valeurHoraire * 1) });
        });
        return horaires;
    }
    _displayActivityIndicator() {
        if (this.state.isLoad) return (
            <View style={styles.view_main_indicator}>
                <ActivityIndicator size="large" color={color.mine.dark} />
            </View>
        )
    }
    _displayFrm = () => {
        if (this.state.haveDone) {
            this.form.client = (this.form.client == null) ? { ...this.form.passagers[0] } : { ...this.form.client };
            return (
                <View style={[styles.view_main, { flex: 1 }]}>
                    <ScrollView style={[styles.view_main, { flex: 1 }]}>
                        <Text style={styles.frmPartTitle}>Itin&eacute;raire</Text>
                        <View style={{ backgroundColor: '#fff', borderRadius: 8, marginBottom: 12 }}>
                            <View style={{ backgroundColor: '#ccc', flexDirection: 'row', paddingHorizontal: 10 }}>
                                <Text style={{ flex: 1, color: '#333' }}>De</Text>
                                <Text style={{ flex: 1, color: '#333' }}>&Agrave;</Text>
                                <Text style={{ flex: 1, color: '#333' }}>Date</Text>
                                <Text style={{ flex: 0, color: '#333' }}>Heure</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Text style={{ flex: 1, color: '#333', fontSize:12 }}>
                                    {this.state.panier.stStart}
                                </Text>
                                <Text style={{ flex: 1, color: '#333', fontSize:12 }}>
                                    {this.state.panier.stStop}
                                </Text>
                                <Text style={{ flex: 1, color: '#333', fontSize:12 }}>
                                    {moment.utc(this.state.panier.dStart * 1000).utcOffset('+00:00').format('DD/MM/YYYY')}
                                </Text>
                                <Text style={{ flex: 0, color: '#333', fontSize:12 }}>
                                    {moment.utc(this.state.panier.hStart * 1000).utcOffset('+00:00').format('HH:mm')}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.frmPartTitle}>Passager</Text>
                        <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, overflow: 'hidden' }}>
                            {/* <FlatList
                                data={this.state.panier.items}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10 }}>
                                        <View style={styles.confirmationRow}>
                                            <Text style={[styles.frmLbl, styles.confirmationRowLbl]}>Nom:</Text>
                                            <Text style={{ color: '#333' }}>{item.name}</Text>
                                        </View>
                                        <View style={styles.confirmationRow}>
                                            <Text style={[styles.frmLbl, styles.confirmationRowLbl]}>Age:</Text>
                                            <Text style={{ color: '#333' }}>{item.age}</Text>
                                        </View>
                                        <View style={styles.confirmationRow}>
                                            <Text style={[styles.frmLbl, styles.confirmationRowLbl]}>Prix:</Text>
                                            <Text style={{ color: '#333' }}>{item.subtotal} XAF</Text>
                                        </View>
                                    </View>
                                )} 
                            /> */}
                            {this.displayConfirmationItems(this.state.panier.items)}
                            <View style={styles.total}>
                                <Text style={{ paddingHorizontal: 2, paddingVertical: 8, fontSize: 16, color: '#333' }}>Total à payer :</Text>
                                <Text style={{ fontSize: 16, color: '#333' }}>{this.state.panier.total} XAF</Text>
                            </View>
                        </View>
                        <Text style={styles.frmPartTitle}>Payeur</Text>
                        <View style={{ backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, paddingHorizontal: 10, paddingVertical: 8 }}>
                            <View style={[styles.view, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'none' }]}>
                                <Text style={[styles.frmLbl, { margin: 0, padding: 0, paddingVertical: 8 }]}>NOM(s):</Text>
                                <TextInput
                                    accessibilityLabel="Entrez le nom du payeur"
                                    placeholderTextColor={color.mine.textGray}
                                    autoCapitalize="words"
                                    style={[styles.textInput, { flex: 1, borderWidth: 0, paddingLeft: 10, borderBottomWidth: 0.5, borderRadius: 0 }]}
                                    defaultValue={this.form.client.nom + ' ' + this.form.client.prnom}
                                    placeholder="MBOTA Carlos"
                                    onChangeText={(value) => { this.form.client.nom = value; }} />
                            </View>
                            <Text style={styles.frmLbl}>Téléphone:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.view]}>
                                    <TextInput
                                        accessible={false}
                                        editable={false}
                                        value="+242"
                                        style={{ 
                                            ...styles.textInput,
                                            flex: 0,
                                            paddingLeft: 10,
                                            borderWidth: 0,
                                            borderBottomWidth: 0.5,
                                            width: 'auto',
                                            borderTopRightRadius: 0,
                                            borderRadius: 0,
                                            borderBottomRightRadius: 0,
                                            borderRightWidth: 0,
                                            backgroundColor: 'transparent',
                                            color: '#000000',
                                            fontSize: 20,
                                            textShadowColor: '#fff', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 1 
                                        }} 
                                    />
                                </View>
                                <TextInput
                                    accessibilityLabel="Entrez votre téléphone"
                                    placeholderTextColor={color.mine.textGray}
                                    inputMode="tel"
                                    keyboardType="phone-pad"
                                    maxLength={15}
                                    style={[styles.textInput, { flex: 1, paddingLeft: 0, paddingVertical: 8, borderWidth: 0, borderBottomWidth: 0.5, borderRadius: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0, paddingLeft: 10 }]}
                                    defaultValue={this.form.client.tel}
                                    placeholder="012345678"
                                    onChangeText={(value) => { this.form.client.tel = value; }} />
                            </View>
                        </View>
                        {/* <InputTypeButton
                            label="Confirmer"
                            design={{ input: styles.btnInput, label: { color: '#fff' } }}
                            onSubmit={() => { if (this._confirmMyCmd()); }} /> */}
                    </ScrollView>
                    <View style={styles.frmPartBtn}>
                        <InputTypeButton
                            label="Confirmer"
                            design={{ input: styles.btnInput, label: { color: '#fff' } }}
                            onSubmit={() => { if (this._confirmMyCmd()); }} />
                    </View>
                </View>
            )
        };
        return (
            <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                <ScrollView style={[styles.view_main, { flex: 1 }]}>
                    <Text style={[styles.frmPartTitle]}>Itinéraire</Text>
                    <View style={styles.frmPart}>
                        <View style={{ felx: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.frmLbl}>Station de départ</Text>
                                <View style={styles.view}>
                                    <Icon name="arrow-up-circle" color={color.mine.primary} size={24} style={styles.fldIcon} />
                                    <View>
                                        <Select
                                            ext={this.form.ldd}
                                            placeholder={{ label: 'Choisir une station de départ', value: -1 }}
                                            // items={this.state.stations}
                                            items={this.view_stations}
                                            getValue={(value) => { this.form.ldd = value; /* this.setState({horaires:this._initHoraires(value)}); */ this.setState({ cStation: value }); }} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.frmLbl}>Station d'arrivé</Text>
                                <View style={styles.view}>
                                    <Icon name="arrow-down-circle" color={color.mine.primary} size={24} style={styles.fldIcon} />
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder={{ label: 'Choisir une station de d\'arrivé', value: -1 }}
                                        // items={this.state.stations}
                                        items={this.view_stations}
                                        getValue={(value) => { this.form.lda = value; }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ felx: 1, flexDirection: 'row' }}>
                            <InputTypeDate
                                type="date"
                                parDefaut={this.form.ddd}
                                getValue={(value) => { this.form.ddd = value; }}
                                label={{ text: "Date de départ", design: styles.frmLbl }}
                                icon={() => (<Icon name="calendar" color={color.mine.primary} size={24} style={styles.fldIcon} />)}
                                design={{ textInput: styles.textInput, container: { flex: 4 }, borderWidth: 0 }} />
                            <View style={[styles.view, { flex: 3, marginLeft: 8 }]}>
                                <Text style={styles.frmLbl}>Heure de départ</Text>
                                <View style={styles.view}>
                                    <Icon name="clock" color={color.mine.primary} size={24} style={styles.fldIcon} />
                                    <Select
                                        ext={this.form.hdd}
                                        placeholder={{ label: 'HH:mm', value: -1 }}
                                        // items={this.state.horaires}
                                        items={this._initHoraires(this.state.cStation)}
                                        getValue={(value) => { this.form.hdd = value; }} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.frmPartTitle}>Passager</Text>
                    <View style={styles.frmPart}>
                        <Passager
                            nbr={0}
                            values={this.form.passagers}
                            getValues={(mPassager) => { this.form.passagers[0] = mPassager; }} />
                    </View>
                </ScrollView>
                <View style={styles.frmPartBtn}>
                    <InputTypeButton
                        label="Enregistrer"
                        design={{ input: styles.btnInput, label: { color: '#fff' } }}
                        onSubmit={this._sendFrm} />
                </View>
            </View>
        );
    }
    _sendFrm = (isConfirmation) => {
        //affiche loader
        this.setState({ isLoad: true });
        //send le tout le form sauf le client
        sendReservationData(this.agence, {
            client: null,
            passagers: this.form.passagers,
            ddd: this.form.ddd / 1000 + this.form.hdd,
            ldd: this.form.ldd,
            lda: this.form.lda,
            hdd: this.form.hdd
        }, isConfirmation).then(json => {
            //cache loader
            this.setState({ isLoad: false });
            if (typeof json != 'undefined' && json != undefined)
                if (json.errs.length > 0) alert('error send form :' + json.errs[0]);
                else {

                    /* if(typeof json.session=="undefined" || json.session==null) return 0;
                    this.session=json.session; */

                    if (typeof json.panier != 'undefined') this.setState({ haveDone: true, panier: json.panier });
                    else alert('error send form : dont get momo link');
                }
        }).catch((response) => alert('err send reservation:' + response));
    }
    _confirmMyCmd = () => {
        //affiche loader
        this.setState({ isLoad: true });
        confirmCmd(this.state.panier.transaction_num, this.form.client).then(json => {
            if (typeof json !== 'undefined')
                if (json.errs.length > 0) alert('error send form :' + json.errs[0]);
                else {
                    const dateRes = (new Date()).getTime();
                    const name = 'empty_' + dateRes;
                    //add empty ticket a l'historique
                    this._addToHistorique(name, {
                        adrs: null,
                        ldd: this.form.ldd,
                        lda: this.form.lda,
                        ddd: this.form.ddd / 1000 + this.form.hdd,
                        hdd: this.form.hdd,
                        idRes: 0,
                        stateRes: 0,
                        dateRes: dateRes,
                        agence: null,
                        adrsLocal: null,
                        report: 0,
                        transactionNum: this.state.panier.transaction_num
                    });
                    //ask for ticket
                    let i = 0, trouve = false, errs = [];
                    const idTimer = setInterval(() => {
                        if (i < 6 && !trouve) {
                            getTicket().then(json => {console.log('getTicketInterval'), console.log(json);
                                json = JSON.parse(json);
                                //cache loader
                                if (typeof json !== 'undefined')
                                    if (json.errs.length > 0) errs.push(json.errs[0]);
                                    else if (typeof json.recu != 'undefined' && json.recu.length > 0) {
                                        //sauvegarder le billet dans le phone
                                        getImgBillet(json.recu[0].name, json.recu[0].adrs)
                                            .then(adrsLocalBillet => {
                                                //une fois le billet download
                                                this._majToHistorique(json.recu[0].name, {
                                                    adrs: json.recu[0].adrs,
                                                    ldd: json.recu[0].ldd,
                                                    lda: json.recu[0].lda,
                                                    ddd: json.recu[0].ddd,
                                                    hdd: json.recu[0].hdd,
                                                    idRes: json.recu[0].idRes,
                                                    stateRes: 1,
                                                    dateRes: json.recu[0].dateRes,
                                                    agence: json.recu[0].agence,
                                                    adrsLocal: adrsLocalBillet,
                                                    report: 0,
                                                    transactionNum: json.recu[0].transaction_num
                                                });

                                                this.adrsPhysiqueBillet = adrsLocalBillet;
                                                //le billet est bien sauvegarde
                                                trouve = true;
                                            })
                                            .catch((response) => { alert('err get ticket:' + response) });
                                    }
                            }).catch((response) => alert('err send reservation:' + response));

                            /* saveTicket()
                                .then(adrs => {console.log('adrs:'+adrs);
                                    this.adrsPhysiqueBillet = adrs;
                                    //le billet est bien sauvegarde
                                    trouve = true;
                                })
                                .catch((response) => alert('err send reservation:' + response)); */

                            console.log('interval:' + i);
                            i++;
                        } else {
                            //arreter le timer
                            clearInterval(idTimer);
                            if (trouve) {
                                //le billet existe
                                //detruire la session
                                clozSession().then(json => {
                                    //refresh agence
                                    if (typeof json != 'undefined' && json != undefined) this._refreshAgences(json.agences);
                                }).catch((response) => console.log(response));
                                //ouvrir le component billet
                                this.props.navigation.navigate('billet', { adrs: this.adrsPhysiqueBillet });
                            } else
                                //ouvrir le component agence
                                this.props.navigation.navigate('agence');
                        }
                        if (!trouve && errs.length > 0) console.log('error get ticket :' + errs[0]);
                    }, 16000);

                    return 1;
                }
        }).catch((response) => alert('err send confirmation:' + response));
        return 0;
    }
    _addToHistorique(name, data) {
        const action = { type: 'ADD_BILLET', value: { id: name, value: data } };
        this.props.dispatch(action);
    }
    _delToHistorique(name, data) {
        const action = { type: 'DEL_BILLET', value: { id: name, value: data } };
        this.props.dispatch(action);
    }
    _majToHistorique(name, data) {
        const action = { type: 'MAJ_BILLET', value: { id: name, value: data } };
        this.props.dispatch(action);
    }
    _toogleToSession(name, data) {
        const action = { type: 'TOOGLE_SESSION', value: { id: name, value: data } };
        this.props.dispatch(action);
    }
    _refreshAgences(data) {
        const action = { type: 'REFRESH_AGENCE', value: data };
        this.props.dispatch(action);
    }

    displayConfirmationItems(items) {
        return items.map((item, i) => (
            <View key={"passager_"+i} style={{ flex: 1, paddingHorizontal: 5, paddingVertical: 8, marginBottom: 10 }}>
                <View style={styles.confirmationRow}>
                    <Text style={styles.confirmationRowLbl}>Nom:</Text>
                    <Text style={{ color: '#333', paddingHorizontal:10 }}>{item.name} {item.other_name}</Text>
                </View>
                <View style={styles.confirmationRow}>
                    <Text style={styles.confirmationRowLbl}>Age:</Text>
                    <Text style={{ color: '#333' }}>{item.age}</Text>
                </View>
                <View style={styles.confirmationRow}>
                    <Text style={styles.confirmationRowLbl}>Prix:</Text>
                    <Text style={{ color: '#333' }}>{item.subtotal} XAF</Text>
                </View>
            </View>
        ));
    }
}
const styles = StyleSheet.create({
    view_main: { paddingTop: 5, paddingHorizontal: 10, position: 'relative', backgroundColor: color.mine.divider },
    view_main_indicator: design.view_main_indicator,
    frmPartTitle: {
        marginBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 1,
        // color:'#333', 
        textShadowColor: '#fff',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 0,
        color: '#666'
    },
    frmPart: {
        backgroundColor: '#fff0',
        paddingHorizontal: 10,
        paddingTop: 0,
        // paddingBottom:12, 
        marginBottom: 10,
        borderRadius: 12
    },
    frmPartBtn: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingTop: 15,
        backgroundColor: '#ececec'
    },
    textInput: design.form.textInput,
    frmLbl: design.form.label,
    fldIcon: design.form.icon,
    confirmationRow: { flex: 0, flexDirection: 'row', marginTop: 5, alignItems:'flex-start' },
    confirmationRowLbl: { ...design.form.label, marginRight: 2, marginTop: 0, padding:0, width: 40 },
    confirmationRowVal: { color: '#000' },
    btnInput: {
        borderRadius: 5,
        backgroundColor: color.mine.dark,
        borderColor: color.mine.dark_1,
        borderWidth: 0.5,
        margin: 0, 
        padding: 0,
    },
    total: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: '#ececec',
        backgroundColor: 'beige',
        backgroundColor: 'yellow'
    }
});
const mapStateToProps = (globalState) => {
    return {
        profil: globalState.toogleProfil.profil
    }
}
export default connect(mapStateToProps)(Reservation);
// export default Reservation;