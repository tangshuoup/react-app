import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {register} from '../../redux/user'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
@connect(
	state=>state.user,
	{register}
)
class Register extends Component{
	constructor(props){
		super(props)
		this.state={
			user:'',
			psd:'',
			againPsd:'',
			type:'genius'
		}
	}
	handleChage(key,value){
		this.setState({
			[key]:value
		})
	}
	handleRegister=()=>{
		this.props.register(this.state)
	}
	render(){
		const RadioItem = Radio.RadioItem
		const {msg,redirectTo} =this.props
		return (
			<div>
				{redirectTo?<Redirect to={redirectTo} />:null}
				<WingBlank>
					<Logo></Logo>
					<List>
						{msg? <p className="error-msg">{msg}</p>:null}
						<InputItem
						onChange={v=>this.handleChage('user',v)}>用户名
						</InputItem>
						<WhiteSpace/>
						<InputItem
						type='password'
						onChange={v=>this.handleChage('psd',v)}>密码
						</InputItem>
						<WhiteSpace/>
						<InputItem
						type='password'
						onChange={v=>this.handleChage('againPsd',v)}>确认密码
						</InputItem>
						<WhiteSpace/>
						<RadioItem 
						checked={this.state.type==='genius'}
						onChange={()=>this.handleChage('type','genius')}>
							牛人
						</RadioItem>
						<RadioItem 
						checked={this.state.type==='boss'}
						onChange={()=>this.handleChage('type','boss')}>
							BOSS
						</RadioItem>				
					</List>
					<WhiteSpace/>
					<Button type='primary' onClick={this.handleRegister}>注册</Button>
				</WingBlank>
			</div>	
		)
	}
}

export default Register