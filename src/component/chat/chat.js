import React from 'react'
import {List,InputItem,NavBar,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,resvMsg} from '../../redux/chat'
import {getChatId} from '../../untils.js'
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
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList(),
			this.props.resvMsg()
		}
	 }
	handleSubmit(){ 
	  const from = this.props.user._id
	  const to = this.props.match.params.user
	  const msg = this.state.text
	  this.props.sendMsg({from, to, msg})
	  this.setState({text:''})
	}
	render () {
	  const userid = this.props.match.params.user
	  const users = this.props.chat.users
	  const Item = List.Item
	  const chatid = getChatId(userid,this.props.user._id)
	  const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid === chatid)
      if(!users[userid]){
      	return null
      }
	  return (
	  	  <div>
	  	    <div id="chat-pages">
	  	    	<NavBar 
	  	    	  mode="dark" 
	  	    	  icon={<Icon type="left" />}
	  	    	  onLeftClick={() =>{
					this.props.history.goBack()
	  	    	  }}>
	  	    		{users[userid].name}	  	    	
	  	    	</NavBar>
	  	  	{chatmsg.map(v=>{
	  	  		return v.from === userid ? (
	  	  		  <List key={v._id}>
	  	  		     <Item
	  	  		        thumb={require(`../img/${users[v.from].avatar}.png`)}
	  	  		        >
	  	  		     	{v.content}
	  	  		     </Item>
	  	  		  </List>	
	  	  		) : (
	  	  		  <List key={v._id}>
	  	  		  	<Item
	  	  		  	   extra={<img src={require(`../img/${users[v.from].avatar}.png`)} alt=""/>} 	  		  	   
	  	  		       className='chat-me'	  	  		  	    	  		  	 
	  	  		  	>
	  	  		  		{v.content}
	  	  		  	</Item>
	  	  		  </List>
	  	  		)
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