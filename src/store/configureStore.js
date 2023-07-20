import {createStore} from 'redux';
import toogleProfil from './reducers/profilReducer';
import toogleHistorique from './reducers/historiqueReducer';
import toogleSession from './reducers/sessionReducer';
import refreshAgences from './reducers/AgenceReducer';
import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const rootPersistConfig = {  key: 'root', blacklist:['agences'],  storage: AsyncStorage};
const rootPersistConfig = {  key: 'root', blacklist:['refreshAgences'],  storage: AsyncStorage};

export default createStore(persistCombineReducers(rootPersistConfig, {toogleProfil, toogleHistorique, toogleSession, refreshAgences}));
// export default createStore(refreshAgences);
// export default createStore(toogleHistorique);

/* export default createStore(
    refreshAgences
    // combineReducers(refreshAgences)
    // combineReducers({refreshAgences, toogleHistorique}),
    // persistCombineReducers(rootPersistConfig, toogleHistorique)
    // refreshAgences, toogleHistorique
); */