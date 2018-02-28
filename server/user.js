const express = require('express')
const Router = express.Router()
const model = require('./model')
const utils = require('utility')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter ={'psd':0,'_v':0}
// Chat.remove({},function(e,d){
	
// })
Router.get('/list',function(req,res){
	const {type} = req.query
	// User.remove({},function(req,res){})
	User.find({type},function(err,doc){
		return res.json({code:0,data:doc})
	})
})
Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid
	User.find({},function(e,userdoc){
		let users = {}
		userdoc.forEach(v=>{
		  users[v._id] = {name:v.user, avatar:v.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
		  if (!err) {
		  	return res.json({code:0,msgs:doc,users:users})
		  }
		})
	})		
})
Router.post('/update',function(req,res){
	const userid = req.cookies.userid;
	if(!userid){
		return json.dumps({code:1})
	}
	const body =req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data=Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})

})
Router.post('/login',function(req,res){
	const {user,psd} =req.body
	User.findOne({user,psd:Md5(psd)},_filter,function(err,doc){
		if(!doc){
			return res.json({code:1,msg:'用户名或者密码错误'})
		}
		res.cookie('userid',doc._id)
		return res.json({code:0,data:doc})
	})
})
Router.post('/register',function(req,res){
	const {user,psd,type} =req.body
	User.findOne({user},function(err,doc){
		console.log(doc);
		if(doc){
			return res.json({code:1,msg:'用户名已重复'})
		}
		const userModel = new User({user,type,psd:Md5(psd)})
		userModel.save(function(e,d){
			if(e){
				return res.json({code:1,msg:'服务器出错'})
			}
			const {user,type,_id}=d
			res.cookie('userid',_id)
			return res.json({code:0,data:{user,type,_id}})
		})
		// User.create({user,psd:Md5(psd),type},function(err,doc){
		// 	if(err){
		// 		return res.json({code:1,msg:'服务器出错'})
		// 	}
		// 	return res.json({code:0})
		// })
	})
})
Router.get('/info',function(req,res){
	const {userid} =req.cookies
	if(!userid) {
		return res.json({code:1})
	}
	User.findOne({_id:userid},_filter,function(err,doc){
		if (err){
			return res.json({code:1,msg:'服务器出错'})
		}
		if(doc){
			return res.json({code:0,data:doc})
		}
	})
	
})

function Md5(psd){
	const salt = 'tang_shuo_147896_@#psd'+psd
	return 	utils.md5(utils.md5(salt))
}

module.exports =Router
