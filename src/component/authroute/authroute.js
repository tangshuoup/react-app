import {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user'
import axios from 'axios'
@withRouter
@connect(
	null,
	{loadData}
)
class AuthRoute extends Component {
	componentDidMount(){
		const pubilicList = ['/login','/register']
		const pathName = this.props.location.pathname
		if(pubilicList.indexOf(pathName)>-1){
			return null
		}
		// 获取用户信息
		axios.get('/user/info').then(res=>{
			if(res.status===200){
				if(res.data.code===0){
					this.props.loadData(res.data.data)
				}else{
					console.log(this.props.history)
					this.props.history.push('/login')
				}
			}
		})
		//是否登录
		//url地址
		//用户身份
		//信息完善
	}
	render(){
		return null
	}
}
export default AuthRoute 