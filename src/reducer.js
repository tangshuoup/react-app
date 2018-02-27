//合并所有reducer 并且返回
import { combineReducers } from 'redux';
import { user } from './redux/user'
import { chatuser } from './redux/chatuser'
import { chat } from './redux/chat'
const reducers = combineReducers({user,chatuser,chat})
export default reducers