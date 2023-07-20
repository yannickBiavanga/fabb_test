import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDate, getTime, color } from '../util/util';
class ItineraireItems extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const itineraire = this.props.itineraire;
        const idAgence = this.props.agence;
        return (
            <TouchableOpacity onPress={() => { this.props.openReservationFrm(idAgence, itineraire.id_ldd, itineraire.cod_ldd, itineraire.id_vda, 0, (1 * itineraire.ddd - itineraire.hdd), 1 * itineraire.hdd, 1 * itineraire.dda) }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#efefef', marginTop: 2 }}>
                    <View style={{ flex: 0, flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
                        <Icon name="human-male" color={color.mine.primary} size={22} />
                        <Text style={styles.prices}>{itineraire.prix_adulte} XAF</Text>
                    </View>
                    <View style={{ flex: 0, flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
                        <Icon name="human-child" color={color.mine.primary} size={18} />
                        <Text style={styles.prices}>{itineraire.prix_enfant} XAF</Text>
                    </View>
                </View>
                <View style={[{ padding: 12, paddingTop: 10, paddingBottom: 2, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: "#ccc" }]}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingEnd:20, marginBottom: 0, borderWidth: 0, borderColor: 'red' }}>
                            {/* start to */}
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.view_value_txt_2}>{getTime(1 * itineraire.hdd)}</Text>
                                <Text style={styles.view_value_txt_vdd}>{itineraire.nom_vdd}</Text>
                            </View>
                            {/* arrow */}
                            <View style={{ justifyContent: 'center', marginHorizontal:20 }}>
                                {/* <Text style={styles.view_value_txt_4}>---&gt;</Text>*/}
                                <Icon name="arrow-right" color={color.mine.primary} size={24} style={styles.fldIcon} />
                            </View>
                            {/* arrived to */}
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.view_value_txt_2}>{getTime(1 * itineraire.dda)}</Text>
                                <Text style={styles.view_value_txt_lda}>{itineraire.nom_vda}</Text>
                            </View>
                        </View>
                        {/* place number */}
                        <View style={{ flex: 1, borderWidth: 0, borderColor: 'blue', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.view_value_txt_taux}>{1 * itineraire.nbr2Places}</Text>
                            <Text style={styles.view_value_txt_ldd}>{itineraire.cod_ldd}</Text>
                        </View>
                        </View>
                    </View>
                    {/* start date */}
                    <Text style={[styles.view_value_txt_date, { flex: 1 }]}>{getDate(1 * itineraire.hStart)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    view_main: { borderBottomWidth: 0, borderColor: "#ccc", backgroundColor: '#fff', flexDirection: "row" },
    view_lbl: { flex: 1, flexDirection: 'row' },
    view_lbl_txt: {},
    view_value: { flex: 1, flexDirection: 'row', fontWeight: 'bold' },
    view_value_txt_date: { flex: 2, color: '#000', fontWeight: 'normal', paddingBottom: 5, paddingTop: 8 },
    view_value_txt_2: { flex: 0, color: color.mine.textDark, marginBottom: 8 },
    view_value_txt_3: { flex: 2, color: color.mine.textDark },
    view_value_txt_vdd: { flex: 0, color: color.mine.textDark },
    view_value_txt_ldd: { flex: 2, color: color.mine.secondary },
    view_value_txt_lda: { flex: 0, color: color.mine.textDark },
    view_value_txt_4: { color: color.mine.textDark },
    view_value_txt_5: { flex: 2, color: color.mine.textDark },
    view_value_txt_taux: { color: color.mine.secondary, fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
    prices: { fontSize: 12, color: '#333' }
});
export default ItineraireItems;