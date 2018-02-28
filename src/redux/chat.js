import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:9090')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
	chatmsg:[],
	users:{},
	unread:0
}
export function chat (state=initState,action){
	switch(action.type){
		case MSG_LIST:
		  return {
		  	...state,
		  	chatmsg:action.payload.msgs,
		  	users:action.payload.users,
		  	unread:action.payload.msgs.filter(v=>!v.read&&v.to === action.payload.userid).length
		  }
		case MSG_RECV:
		  const n = action.payload.to === action.userid ? 1 : 0
		  console.log(n)
		  return {
		  	...state,
		  	chatmsg:[...state.chatmsg,action.payload],
		  	unread:state.unread + n
		  }
		// case MSG_READ:
		default:
		  return state
	}
}



function msglist (msgs, users, userid) {
	return {type:MSG_LIST,payload:{msgs, users, userid}}
}
function msgRecv (msg, userid) {
  return {userid,type:MSG_RECV,payload:msg}
}
export function resvMsg () {
  return (dispatch,getState)=>{
  	socket.on('recvmsg',function(data){
  		const userid = getState().user._id
  		dispatch(msgRecv(data, userid))
  	})
  }
}
export function sendMsg ({from, to, msg}) {
  return dispatch=>{
  	socket.emit('sendmsg',{from,to,msg})
  }
}
export function getMsgList () {
  return (dispatch,getState)=>{
  	axios.get('/user/getmsglist')
  	  .then(res=>{
  	  	if(res.data.code ===0){
  			const userid = getState().user._id
  	  		dispatch(msglist(res.data.msgs, res.data.users, userid))
  	  	}
  	  })
  }
}