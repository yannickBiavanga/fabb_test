const initState={profil:null};

function toogleProfil(globalState=initState, action){
    switch (action.type){

        case 'ADD_PROFIL':
            let cProfil=action.value;
            return {
                ...globalState,
                profil:cProfil

            } || globalState;
        case 'DEL_PROFIL':
            return {
                ...globalState,
                profil:null

            } || globalState;
            
        default: return globalState;
    }
}
export default toogleProfil;