import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from '../util/util';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class HistoriqueItems extends React.Component {
    constructor(props) {
        super(props);
        this.billet = this.props.billet.value;
        this.isPaire = this.props.isPaire;
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 5, paddingHorizontal: 10, paddingVertical: 8 }}>
                {this.billet.stateRes
                    ?
                    (
                        <View style={{ flex: 1, width: '100%', backgroundColor: "#fff", borderBottomWidth: 1.5, borderColor: '#ccc', borderRadius: 12, overflow: 'hidden' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={styles.statusBtn}>
                                    {this._statusIcon("check-decagram", 'green', 32)}
                                </View>
                                <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 15 }}>
                                    <Text style={styles.agenceText}>
                                        {this.billet.agence}
                                    </Text>
                                    <Text style={{ fontSize: 12, color:'#666'}}>
                                        {this.billet.idRes}
                                    </Text>
                                    <View style={{ flex: 1, marginTop: 5, marginBottom: 10 }}>
                                        <Text style={styles.itineraireText}>
                                            de {this.billet.ldd} vers {this.billet.lda}
                                        </Text>
                                        <Text style={styles.itineraireText}>
                                            le {moment.utc(this.billet.ddd * 1000).utcOffset('+00:00').format('ddd, DD MMMM YYYY')} à {moment.utc(this.billet.hdd * 1000).utcOffset('+00:00').format('HH:mm')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {/* bouton */}
                            <View style={styles.actionBtn}>
                                <TouchableOpacity style={styles.billetBtn} onPress={() => { this.props.openBillet(this.billet.adrsLocal); }}>
                                    <Icon name="eye" color="#fff" size={24} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.billetBtn} onPress={() => { this.props.openReport(this.props.billet.id, this.billet.idRes, this.billet.ddd * 1000, this.billet.hdd * 1000, this.billet.report); }}>
                                    <Icon name="clock-time-eight-outline" color={(this.billet.report) ? "#ccc" : "#fff"}  size={24} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.billetBtn} onPress={() => { this.props.openRemove(this.props.billet.id, this.billet.idRes, this.billet.dateRes * 1000, this.billet.ldd, this.billet.lda, this.billet.ddd * 1000) }}>
                                    <Icon name="delete-forever" color="#fff" size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    :
                    (
                        <TouchableOpacity style={styles.badTicketView} onPress={() => { this.props.saveTicket(this.billet.transactionNum) }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                {/* state */}
                                <View style={styles.statusBtn}>
                                    {this._statusIcon("alert-octagon", 'red', 32)}
                                </View>
                                <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 15 }}>
                                    {/* agence */}
                                    <Text style={styles.agence}>
                                        {/* {this.billet.agence} */}
                                        En attente de paiement...
                                    </Text>
                                    <View style={{ flex: 1, marginTop: 5, marginBottom: 10 }}>
                                        {/* itineraire */}
                                        <Text style={styles.itineraireText}>
                                            Validez le paiement puis cliquez ici pour actualiser
                                        </Text>
                                        {/* date voyage */}
                                        <Text style={{ color: '#333' }}>
                                            {/* le {moment.utc(this.billet.ddd * 1000).utcOffset('+00:00').format('ddd, DD MMMM YYYY')} 
                                        à {moment.utc(this.billet.hdd * 1000).utcOffset('+00:00').format('HH:mm')} */}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {/* bouton */}
                            {/* <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', borderTopWidth: 0, borderColor: 'red', paddingHorizontal: 10, backgroundColor: '#ccc' }}>
                                <TouchableOpacity style={styles.billetBtn} onPress={() => { this._nothing() }}>
                                    <Icon name="eye" color="#fff" size={18} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.billetBtn} onPress={() => { this._nothing() }}>
                                    <Icon name="clock-time-eight-outline" color="#fff" size={18} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.billetBtn} onPress={() => { this._nothing() }}>
                                    <Icon name="delete-forever" color="#fff" size={18} />
                                </TouchableOpacity>
                            </View> */}
                        </TouchableOpacity>
                    )
                }
                {/* reservation date */}
                <View style={{ justifyContent: 'flex-end', width: '100%', paddingHorizontal: 16 }}>
                    <Text style={{ color: '#666', fontSize: 12, textAlign: 'right' }}>
                        {'Réservation du ' + moment(this.billet.dateRes * 1000).format('DD/MM/YYYY à HH:mm')}
                    </Text>
                </View>
            </View>
        )
    }

    _nothing() {
        console.log('alert something !');
    }
    _statusIcon(name, color, size) {
        return <Icon name={name} color={color} size={42} />
    }
}

export default HistoriqueItems;
const styles = StyleSheet.create({
    oldMain: { flex: 1, flexDirection: 'row', padding: 12, paddingVertical: 0, /* backgroundColor:(this.isPaire?'#fff':'#ececec') */ },
    billetBtn: { flex: 0, marginHorizontal: 5, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#9992' },
    statusBtn: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#ececec3', paddingHorizontal: 8 },
    agenceText: { flex: 0, fontWeight: 'bold', fontSize: 14, color: '#2c3b41', backgroundColor: 'transparent' },
    itineraireText: {color: '#333', marginBottom: 5 },
    badTicketView: { flex: 1, width: '100%', backgroundColor: "#fff", borderBottomWidth: 1.5, borderColor: '#ccc', borderRadius: 12, overflow: 'hidden' },
    actionBtn:{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', borderTopWidth: 0, borderColor: 'red', paddingHorizontal: 10, /* paddingVertical:10, */ backgroundColor: color.mine.dark }
});