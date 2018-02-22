import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/user'
import {List,InputItem,WhiteSpace,WingBlank,Button} from 'antd-mobile'

@connect(
	state=>state.user,
	{login}
)
class Login extends Component{
	constructor(props){
		super(props)
		this.state={
			user:'',
			psd:''
		}
	}
	register=()=>{
		this.props.history.push('/register')
	}
	loginIn=()=>{
		this.props.login(this.state)
	}
	handleChage(key,value){
		this.setState({
			[key]:value
		})
	}
	render(){
		const {msg,redirectTo} =this.props
		return (
			<div>
				{redirectTo?<Redirect to={redirectTo} />:null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{msg? <p style={{color:'red',padding:'10px 0 0 15px'}}>{msg}</p>:null}
						<InputItem
						onChange={v=>this.handleChage('user',v)}
						>账号</InputItem>
						<WhiteSpace />
						<InputItem 
						type='password'
						onChange={v=>this.handleChage('psd',v)}
						>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type='primary' onClick={this.loginIn}>登录</Button>
					<WhiteSpace />
					<Button type='primary' onClick={this.register}>注册</Button>
				</WingBlank>
			</div>		
		)
	}
}

export default Login