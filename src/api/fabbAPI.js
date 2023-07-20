import RNFS from 'react-native-fs';

export const CGU_URL = "http://192.168.1.67/fabb/_client/_people/cgu.html";
export const BASE_URL = "http://192.168.1.67/fabb/_client/_people/srv/";
export const LOGO_URL = "http://192.168.1.67/fabb/img/logo/";
// const BILLET_URL="http://192.168.43.251/fabb/_client/docs/";
const BILLET_URL = "http://192.168.1.67/fabb/_client/srv/vue/VueDisplayBillet.php?ticket_adrs=";

/* export const CGU_URL = "https://www.ellipse-concept.com/fabb/_client/_people/cgu.html";
export const BASE_URL = "https://www.ellipse-concept.com/fabb/_client/_people/srv/";
export const LOGO_URL = "https://www.ellipse-concept.com/fabb/img/logo/";
//const BILLET_URL="https://www.ellipse-concept.com/fabb/_client/docs/"; 
const BILLET_URL = "https://www.ellipse-concept.com/fabb/_client/srv/vue/VueDisplayBillet.php?ticket_adrs="; */

export const getAgencesFromApi = async () => {
    const url = BASE_URL + "ctrGet.php";
    return fetch(url, { mode: 'cors', credentials: 'include' })
        .then(res => {
            if (res.ok == true) {
                const json = res.json();
                if (!json) throw new Error('error: not a json result ' + json);
                return json;
            }
            else console.log('err reseau');
        })
        .catch((err) => console.error(err));
}
export function getAgencesDataFromApi(mId) {
    const url = BASE_URL + "ctrGet.php?id_agence=" + mId;
    return fetch(url, { mode: 'cors', credentials: 'include' })
        .then(res => {
            if (res.ok == true) {
                const json = res.json();
                if (!json) throw new Error('error: not a json result ' + json);
                return json;
            }
            else console.log('err reseau');
        })
        .catch((err) => console.error(err));
}
export function sendReservationData(mAgence, mJson, isConfirmation) {
    // console.log(mJson);
    const url = BASE_URL + "ctrPost.php?id_agence=" + mAgence + "&is_confirmation=" + isConfirmation;
    let formData = new FormData();
    formData.append('reservation_json', JSON.stringify(mJson));
    formData.append('id_agence', mAgence);
    return fetch(url, { mode: 'cors', credentials: 'include', method: "POST", body: formData })
        .then(res => {
            if (res.ok == true) {
                const json = res.json();
                if (!json) throw new Error('error: not a json result ' + json);
                return json;
            }
            else console.log('err reseau');
        })
        .catch((err) => console.error(err));
}
export function confirmCmd(mTransaction, mClient) {
    const url = BASE_URL + "ctrPost.php";
    let formData = new FormData();
    formData.append('transaction_id', mTransaction);
    formData.append('nom_client', mClient.nom + ' ' + mClient.prnom);
    formData.append('tel_client', mClient.tel);
    formData.append('client_json', JSON.stringify(mClient));
    return fetch(url, { mode: 'cors', credentials: 'include', method: "POST", body: formData })
        .then(res => {
            if (res.ok == true) {
                const json = res.json();
                if (!json) throw new Error('error: not a json result ' + json);
                return json;
            }
            else console.log('err reseau');
        }).catch((err) => console.error(err));
}
export function reportReservation(mReservation_id, mDdd, mHdd, mClient) {
    const url = BASE_URL + "ctrPost.php";
    let formData = new FormData();
    formData.append('report_reservation_id', mReservation_id);
    formData.append('ddd', mDdd);
    formData.append('hdd', mHdd);
    formData.append('tel', mClient.tel);
    formData.append('code_tel', mClient.imei);
    return fetch(url, { mode: 'cors', method: "POST", body: formData })
        .then(res => {
            if (res.ok == true) {
                const json = res.json();
                if (!json) throw new Error('error: not a json result ' + json);
                return json;
            }
            else console.log('err reseau');
        }).catch((err) => console.error(err));
}
export function removeReservation(mReservation_id, mClient) {
    const url = BASE_URL + "ctrPost.php";
    let formData = new FormData();
    formData.append('remove_reservation_id', mReservation_id);
    formData.append('tel', mClient.tel);
    formData.append('code_tel', mClient.imei);
    return fetch(url, { mode: 'cors', method: "POST", body: formData })
        .then(res => {
            if (res.ok == true) {
                const json = res.json();
                if (!json) throw new Error('error: not a json result ' + json);
                return json;
            }
            else console.log('err reseau');
        }).catch((err) => console.error(err));
}
export function getTicket() {
    const url = BASE_URL + "toto.php";
    return fetch(url, { mode: 'cors', credentials: 'include' })
        .then(res => {
            if (res.ok == true) {
                return res.text();
            }
            else console.log('err reseau');
        })
        .catch((err) => console.error(err));
}
export function clozSession() {
    const url = BASE_URL + "ctrGet.php?clozard=1";
    return fetch(url, { mode: 'cors', credentials: 'include' })
        .then(res => {
            if (res.ok == true) {
                const json = res.json();
                return json;
            }
            else console.log('err reseau');
        })
        .catch((err) => console.error(err));
}
export function getImgBillet(mName, mAdr) {
    return RNFS.downloadFile({
        fromUrl: BILLET_URL + mName,
        toFile: `${RNFS.DocumentDirectoryPath}/${mName}`,
    }).promise.then((res) => {
        if (res.statusCode == 200) return `${RNFS.DocumentDirectoryPath}/${mName}`;
        else console.log('not found');
    });
}
export function delImgBillet(mName) {
    // create a path you want to delete
    var path = RNFS.DocumentDirectoryPath + '/' + mName;

    return RNFS.unlink(path)
        .then(() => { console.log('FILE DELETED'); })
        .catch((err) => { console.error(err.message); });
}

export async function saveTicket() {
    const url = BASE_URL + "toto.php";
    fetch(url, { mode: 'cors', credentials: 'include' })
        .then(res => {
            if (res.ok == true) {
                res.json()
                    .then(json => {console.log(json);
                        //cache loader
                        if (typeof json !== 'undefined')
                            if (json.errs.length > 0) throw new Error(json.errs[0]);
                            else if (typeof json.recu != 'undefined' && json.recu.length > 0) return json;
                    })
                    .catch((err) => console.error(err));
            }
            else console.log('err reseau');
        })
        .catch((err) => console.error(err));

}