import moment from 'moment';
const initState = { historique: [] };

function toogleHistorique(globalState = initState, action) {
    let cHistorique = [];
    switch (action.type) {

        case 'ADD_BILLET':
            cHistorique = [action.value, ...globalState.historique]; //console.log(cHistorique);
            return {
                ...globalState,

                historique: cHistorique.sort((a, b) => {
                    if (a.value.ddd < b.value.ddd && a.value.ddd - (moment.unix()) > 0) return -1;
                    else return 1
                })
            } || globalState;

        case 'DEL_BILLET':
            return {
                ...globalState,

                historique: globalState.historique.filter((item) => item.id != action.value.id)
            } || globalState;

        case 'MAJ_BILLET':
            cHistorique = globalState.historique.filter((item) => item.value.transactionNum != action.value.value.transactionNum);
            cHistorique.push(action.value);
            return {
                ...globalState,

                historique: cHistorique.sort((a, b) => {
                    if (a.value.ddd < b.value.ddd && a.value.ddd - (moment().unix()) > 0) return -1;
                    else return 1
                })
            } || globalState;

        case 'MAJ_BILLET_0':
            cHistorique = globalState.historique.filter((item) => item.id != action.value.id);
            cHistorique.push(action.value);
            return {
                ...globalState,

                historique: cHistorique.sort((a, b) => {
                    if (a.value.ddd < b.value.ddd && a.value.ddd - (moment().unix()) > 0) return -1;
                    else return 1
                })
            } || globalState;

        case 'MAJ_BILLET_1':
            cHistorique = globalState.historique.map((value) => {
                if (value.id == action.value.id)
                    return action.value;
            });
            return {
                ...globalState,

                historique: cHistorique.sort((a, b) => {
                    if (a.value.ddd < b.value.ddd && a.value.ddd - (new Date().getTime()) > 0) return -1;
                    else return 1
                })
            } || globalState;

        case 'MAJ_BILLET_STATE':
            cHistorique = globalState.historique.filter((item) => item.value.transactionNum != action.value.value.transactionNum);
            cHistorique.push(action.value);
            return {
                ...globalState,

                historique: cHistorique.sort((a, b) => {
                    if (a.value.ddd < b.value.ddd && a.value.ddd - (moment().unix()) > 0) return -1;
                    else return 1
                })
            } || globalState;

        default: return globalState;
    }
}
export default toogleHistorique;