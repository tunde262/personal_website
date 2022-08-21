import { combineReducers } from 'redux';
import alert from './alertReducer';
import nav from './navReducer';
import post from './postReducer';


export default combineReducers({
    alert,
    nav,
    post
});