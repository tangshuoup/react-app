import React from 'react'
import {List,InputItem,NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,resvMsg} from '../../redux/chat'
@connect(
   state=>state,
   {getMsgList,sendMsg,resvMsg}
)
class Chat extends React.Component {
	constructor(props){
		super(props)
		this.state={
			text:'',
			msg:[]
		}
	}
	componentDidMount(){
		this.props.getMsgList()
		this.props.resvMsg()
	}
	handleSubmit(){
	  const from = this.props.user._id
	  const to = this.props.match.params.user
	  const msg = this.state.text
	  this.props.sendMsg({from, to, msg})
	  this.setState({text:''})
	}
	render () {
		const user = this.props.match.params.user
		const Item = List.Item
	  return (
	  	  <div>
	  	    <div id="chat-pages">
	  	    	<NavBar mode="dark">	  	    	
	  	    	</NavBar>
	  	  	{this.props.chat.chatmsg.map(v=>{
	  	  		return v.from === user ? (
	  	  		  <List key={v._id}>
	  	  		     <Item
	  	  		        >
	  	  		     	{v.content}
	  	  		     </Item>
	  	  		  </List>	
	  	  		) : (
	  	  		  <List key={v._id}>
	  	  		  	<Item
	  	  		  	   extra={'avatar'}
	  	  		       className='chat-me'	  	  		  	    	  		  	 
	  	  		  	>
	  	  		  		{v.content}
	  	  		  	</Item>
	  	  		  </List>
	  	  		)
	  	  		// return <p key={v._id}>{v.content}</p>
	  	  	})}
	  	  	</div>
	        <div className='fixed-footer'>
	        	<List>
	        	   <InputItem
	        	      placeholder="请输入"
	        	      value={this.state.text}
	        	      onChange={(v)=>{
	        	      	this.setState({text:v})
	        	      }}
	        	      extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
	        	   > 	   	
	        	   </InputItem>
	        	</List>
	        </div>
	      </div>
	  	)
	}
}

export default Chat