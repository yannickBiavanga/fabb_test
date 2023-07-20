import moment from 'moment';
const initState={session:null};

function toogleSession(globalState=initState, action){

    switch (action.type){

        case 'TOOGLE_SESSION':
            return {
                ...globalState,

                session:action.value
            } || globalState;
            
        default: return globalState;
    }
}
export default toogleSession;