import React, { Component } from 'react';
import { Text, StyleSheet, ActivityIndicator, StatusBar, FlatList, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { color } from '../util/util';
import moment from 'moment';
import HistoriqueItem from './HistoriqueItem';
import { removeReservation, saveTicket, getImgBillet, getTicket, clozSession } from '../api/fabbAPI';

class Historique extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoad: false }
  }

  render() {
    let i = 0;
    let data = (this.props.historique != 'undefined') ? this.props.historique : [];
    return (
      <SafeAreaView style={[{ flex: 1, justifyContent: 'flex-start', position: 'relative' }, { backgroundColor: color.mine.divider }]}>
        <StatusBar barStyle="light-content" backgroundColor={color.mine.dark_1} />
        {this._displayList(data, i)}
        {this._displayActivityIndicator()}
      </SafeAreaView>
    )
  }

  _displayBillet = (adrs) => {
    this.props.navigation.navigate('billet', { adrs: adrs })
  }

  _report = (mId, mIdRes, mDdd, mHdd, mReport) => {
    try {
      if (mReport)
        throw new Error("Report impossible, un seul report par réservation");
      if (mDdd - (new Date()).getTime() < 0 || mDdd - (new Date()).getTime() < 3600 * 24 * 1000)
        throw new Error("Report impossible, report tardif 24h avant le départ");
      this.props.navigation.navigate('report', { idBillet: mId, idRes: mIdRes, ddd: mDdd, hdd: mHdd })

    } catch (error) { alert(error.name + ":" + error.message); }
  }

  _remove = (mIdBillet, mIdRes, mDateRes, mLdd, mLda, mDdd) => {
    try {
      if (typeof this.props.profil == 'undefined' || this.props.profil == null)
        throw new Error("Annulation impossible, vous devez avoir un compte");
      if (mDdd - (new Date()).getTime() < 0 || mDdd - (new Date()).getTime() < 3600 * 24 * 1000)
        throw new Error("Annulation impossible, report tardif 24h avant le départ:");
      Alert.alert(
        "Annuler la réservation",
        "Du " + moment.utc(mDateRes).utcOffset('+00:00').format('DD/MM/YYYY') + "\nDe " + mLdd + " vers " + mLda + "\nLe " + moment.utc(mDdd).utcOffset('+00:00').format('ddd, DD MMMM YYYY') + " à " + moment.utc(mDdd).utcOffset('+00:00').format('HH:mm'),
        [
          {
            text: "Confirmer",
            onPress: () => {
              //affiche loader
              this.setState({ isLoad: true });
              removeReservation(mIdRes, this.props.profil.value)
                .then(json => {
                  //cache loader
                  this.setState({ isLoad: false });
                  if (typeof json !== 'undefined')
                    if (json.errs.length > 0) throw new Error('error send form :' + json.errs[0]);
                  //refresh agence
                  this._refreshAgences(json.agences);
                  //supprimer le billet de lhistorique
                  this._delToHistorique(mIdBillet, null);
                })
                .catch((response) => alert('err annulation réservation:' + response));
            }
          },
          { text: "Fermer", onPress: () => console.log("Fermer") }
        ]
      );
    } catch (error) { alert(error.name + ":" + error.message); }
  }

  _saveTicket = (transaction_num) => {
    //display le loader
    this.setState({ isLoad: true });
    console.log('save ticket');
    getTicket().then(json => {//console.log(json);
      json = JSON.parse(json);
      //hide loader
      this.setState({ isLoad: false });
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
              //close session
              clozSession().then(json => {console.log(transaction_num);
                  //refresh agence
                  if (typeof json != 'undefined' && json != undefined) this._refreshAgences(json.agences);
              }).catch((response) => console.log(response));
            })
            .catch((response) => { alert('err get billet:' + response) });
        }
    }).catch((response) => alert('err send reservation:' + response));
  }
  _saveTicket0() {
    saveTicket().then(json => {
      console.log(json);
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

          return adrsLocalBillet;
        })
        .catch((response) => { alert('err get billet:' + response) });
    }).catch((response) => alert('err send reservation:' + response));
  }

  _displayList(data, i) {
    if (data.length == 0)
      return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>- Liste vide -</Text></View>);
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {console.log(item);
          i++;
          return (<HistoriqueItem
            openBillet={this._displayBillet}
            openReport={this._report}
            openRemove={this._remove}
            saveTicket={this._saveTicket}
            billet={item} isPaire={(i % 2) == 0}></HistoriqueItem>)
        }
        }
      />
    )
  }

  _displayActivityIndicator() {
    if (this.state.isLoad) return (
      <View style={styles.view_main_indicator}>
        <ActivityIndicator size="large" color={color.mine.dark} />
      </View>
    );
  }

  _refreshAgences(data) {
    const action = { type: 'REFRESH_AGENCE', value: data };
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

}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

const mapStateToProps = (globalState) => {
  return {
    historique: globalState.toogleHistorique.historique,
    profil: globalState.toogleProfil.profil

  }
}
export default connect(mapStateToProps)(Historique);