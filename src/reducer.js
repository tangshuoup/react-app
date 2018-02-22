//合并所有reducer 并且返回
import { combineReducers } from 'redux';
import { user } from './redux/user'


const reducers = combineReducers({user})
export default reducers