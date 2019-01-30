import {connectRouter} from 'connected-react-router'
import {combineReducers} from 'redux';
import social from './social/reducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    social: social,
});
