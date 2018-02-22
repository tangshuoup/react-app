import React,{Component} from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user'
@connect(
	state=>state.user,
	{update}
)
class BossInfo extends Component {
	constructor(props){
		super(props)
		this.state={
			title:'',
			desc:'',
			company:'',
			money:''
		}
	}
	onChange(key,value){
		this.setState({
			[key]:value
		})
	}
	selectAvatar(elem){
		this.setState({
			avatar:elem.text
		})	
	}
	render(){
		const {redirectTo,location}=this.props
		return (
			<div>
				{redirectTo && location.pathname!==redirectTo?<Redirect to={redirectTo}></Redirect>:null}
				<NavBar mode="dark">BOSS完善信息页</NavBar>
				<AvatarSelector selectAvatar={v=>this.selectAvatar(v)}></AvatarSelector>
				<InputItem onChange={(v)=>this.onChange('title',v)}>
					招聘职位
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('company',v)}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('money',v)}>
					职位薪资
				</InputItem>
				<TextareaItem
				title='职位简介' 
				onChange={(v)=>this.onChange('desc',v)}
				rows={3}
				autoHeight
				>					
				</TextareaItem>
				<Button type='primary' onClick={()=>{
					this.props.update(this.state);
				}}>保存</Button>
			</div>
		)
	}
}

export default BossInfo