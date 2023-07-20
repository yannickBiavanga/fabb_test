const initState={agences:[]};

function refreshAgences(globalState=initState, action){
    
    switch (action.type){

        case 'GET_AGENCES':
            return {
                ...globalState,

                agences:action.value
                
            } || globalState;            
         
        case 'REFRESH_AGENCE':
        
            return {
                ...globalState,
                
                agences:action.value
                
            } || globalState;            
            
        default: return globalState;
    }
}
export default refreshAgences;