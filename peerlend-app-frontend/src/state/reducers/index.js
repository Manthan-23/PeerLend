import {combineReducers} from 'redux';
import itemReducer from './itemReducer.js';


const rootReducer = combineReducers({
    user: itemReducer,
}); 

export default rootReducer;