import React from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import axios from 'axios'
class Boss extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			data:[]
		}
	}
	componentDidMount() {
		axios.get('/user/list?type=genius')
		  .then(res=>{
			if (res.data.code==0) {
				this.setState({data:res.data.data})
			}
		  })
	}

	render () {
	  console.log(this.state.data)
	  return (
	  	<WingBlank>
	  		{
	  			this.state.data.map(v=>(
	  				v.avatar?<Card key={v._id}>
	  					<Card.Header
	  						title={v.user}
	  						thumb={require(`../img/${v.avatar}.png`)}
	  						extra={<span>{v.title}</span>}/>
	  					<Card.Body>
	  						<div>{v.desc.split('\n').map(v=>(
	  							<span key={v}>{v}</span>
	  							))}</div>
	  					</Card.Body>	  					
	  				</Card>:null
	  				))
	  		}
	  	</WingBlank>
	  	)
	}
}
export default Boss