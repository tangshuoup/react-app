import axios from 'axios'
import {getRedirectPath} from '../untils'
 
const ERROR_MSG='ERROR_MSG',
	  LOGIN_DATA='LOGIN_DATA',
	  AUTH_SUCCESS='AUTH_SUCCESS',
	  LOGOUT='LOGOUT',
	  initState={
	  	redirectTo:'',
	  	isAuth:'',
	  	msg:'',
	  	user:'',
	  	type:''
	  }	

//reducer
export function user (state=initState, action){
	switch(action.type){
		case AUTH_SUCCESS:
			return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
		case LOGIN_DATA:
			return {...state,...action.payload}	
		case ERROR_MSG:
			return {...state,isAuth:false,msg:action.msg}
		case LOGOUT:
			return {...initState,redirectTo:'/login'}
		default:
			return state
	}
}

//action
function authSuccess(data){
	console.log(data)
	return {type:AUTH_SUCCESS,payload:data}
}
function errorMsg(msg){
	return {msg,type:ERROR_MSG}
}
export function loadData(userinfo){
	return {type:LOGIN_DATA,payload:userinfo}
}
export function update(data){
	return dispatch=>{
		axios.post('/user/update',data)
		.then(res=>{
			if(res.status===200&&res.data.code===0){
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
export function login({user,psd}){
	if(!user || !psd){
		return errorMsg('请输入用户名密码')
	}
	return dispatch=>{
		axios.post('/user/login',{user,psd})
		.then(res=>{
			if(res.status===200&&res.data.code===0){
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
export function register({user,psd,againPsd,type}){
		if(!user || !psd){
			return errorMsg('用户名密码必须输入')
		}
		if(psd!==againPsd){
			return errorMsg('密码和确认密码不同')
		}
		return dispatch=>{
			axios.post('/user/register',{user,psd,againPsd,type})
			.then(res=>{
				if(res.status===200&&res.data.code===0){
					dispatch(authSuccess({user,psd,type}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
				
			})
		}
}
export function logoutSubmit () {
	return {type:LOGOUT}
}


