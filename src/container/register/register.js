import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {register} from '../../redux/user'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import hocForm from '../../component/hoc-form/hoc-form'
@connect(
	state=>state.user,
	{register}
)
@hocForm
class Register extends Component{
	componentDidMount(){
		this.props.handleChage('type','genius')
	}
	handleRegister=()=>{
		this.props.register(this.props.state)
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
						onChange={v=>this.props.handleChage('user',v)}>用户名
						</InputItem>
						<WhiteSpace/>
						<InputItem
						type='password'
						onChange={v=>this.props.handleChage('psd',v)}>密码
						</InputItem>
						<WhiteSpace/>
						<InputItem
						type='password'
						onChange={v=>this.props.handleChage('againPsd',v)}>确认密码
						</InputItem>
						<WhiteSpace/>
						<RadioItem 
						checked={this.props.state.type==='genius'}
						onChange={()=>this.props.handleChage('type','genius')}>
							牛人
						</RadioItem>
						<RadioItem 
						checked={this.props.state.type==='boss'}
						onChange={()=>this.props.handleChage('type','boss')}>
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