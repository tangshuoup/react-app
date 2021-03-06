import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user'
import {Redirect} from 'react-router-dom'
@connect(
   state=>state.user,
   {logoutSubmit}
)
class User extends React.Component {
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
	}
	logout(){
	  const alert = Modal.alert
      alert('注销', '确认退出登录吗???', [
	    { text: '取消', style: 'default' },
	    { text: '确认', onPress: () => {
	    	browserCookie.erase('userid')
	    	this.props.logoutSubmit()
	    }},
	  ]);
	}
	render() {
		const props = this.props
		const Item = List.Item
		const Brief =Item.Brief
		console.log(props)
		return props.user ? (
			<div>
			  <Result
			     img={<img className='user-img' src={require(`../img/${props.avatar}.png`)} alt=""/>}
			     title={props.user}
			     message={props.type === 'boss' ? props.company : null}
			  />
			  <List
			     renderHeader={()=>'简介'}
			  >
			    <Item multipleLine>
			       {props.type === 'genius'?'求职岗位：':'招聘岗位：'}{props.title}	
			        <Brief>{props.type === 'genius'?'简历概述：':'职位要求：'}{props.desc.split('\n').map(d=>(					
					<span key={d}>{d}</span>	
					))}</Brief>	    				   
					{props.money ? <Brief >薪资：{props.money}</Brief> :null}	
			    </Item>
			  </List>
			  <WhiteSpace></WhiteSpace>
			  <List>
			  	<Item onClick={this.logout}>退出登录</Item>
			  </List>
			</div> 
		) : <Redirect to={props.redirectTo} />
	}
}

export default User