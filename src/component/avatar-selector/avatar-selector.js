import React,{Component} from 'react'
import { Grid,List } from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends Component {
	static propTypes = {
		selectAvatar: PropTypes.func.isRequired
	}
	constructor(props){
		super(props);
		this.state={
			avatar:{}
		}
	}
	render(){
		const avatarList=['a','b','c','d','e','f','g','h','i','j','k'].map(v=>({
			icon:require(`../img/${v}.png`),
			text:v
		}))
		const gridHeader=this.state.avatar.icon?(<div>
			<span>
			已选择头像
			<img
			alt="" 
			src={this.state.avatar.icon} 
			style={{width:40,height:40}}/>
			</span>
		</div>)
		:'请选择头像'													
		return(
			<div>
				<List renderHeader={()=>gridHeader}>
					<Grid 
					data={avatarList} 
					activeStyle={false}
					onClick={elm=>{
						this.setState({
							avatar:elm
						})
						this.props.selectAvatar(elm)
					}}/>
				</List>
			</div>
		)
	}
}
export default AvatarSelector
