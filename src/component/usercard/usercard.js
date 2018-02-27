import React from 'react'
import {Card, WingBlank} from 'antd-mobile'
import PropTypes from 'prop-types' 
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component {
  static propTypes = {
		userlist: PropTypes.array.isRequired
	}
	onhandleClick(v){
	  this.props.history.push(`/chat/${v._id}`)
	}
	render() {
		return(
			<WingBlank>
	  		{
	  			this.props.userlist.map(v=>(
	  				v.avatar?
	  				<Card 
	  				   key={v._id}
	  				   onClick={()=>this.onhandleClick(v)}
	  				>
	  					<Card.Header
	  						title={v.user}
	  						thumb={require(`../img/${v.avatar}.png`)}
	  						extra={<span>{v.type === 'boss' ? '招聘职位: ' : ''}{v.title}</span>}/>
	  					<Card.Body>
	  						{v.type === 'boss' ? <div>公司：{v.company}</div> : null}
	  						<div style={{marginBottom:20,marginTop:20}}>{v.type === 'boss' ? '要求: ' : ''}
	  						{v.desc.split('\n').map(d=>(
	  							<span key={d}>{d}</span>
	  							))}</div>
	  						{v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
	  					</Card.Body>	  					
	  				</Card>:null
	  				))
	  		}
	  	</WingBlank>

		)
	}
}

export default UserCard