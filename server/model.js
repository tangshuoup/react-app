const mongoose =require('mongoose')

//链接mongo
const DB_URL = 'mongodb://localhost:27017/tang'
mongoose.connect(DB_URL);

const models = {
	user:{
		'user':{type:String, require:true},
		'psd':{type:String, require:true},
		'type':{type:String, require:true},
		//头像
		'avatar':{type:String},
		// 个人简介或者职位简介
		'desc':{type:String},
		//职位名
		'title':{type:String},
		//boss的两个字段
		'company':{type:String},
		'money':{type:String}
	},
	chat:{
		'chat_id':{type:String,require:true},
		'from':{type:String,require:true},
		'to':{type:String,require:true},
		'content':{type:String,require:true,default:''},
		'read':{type:Boolean,default:false},
		'create_time':{type:Number,default:new Date().getTime()}
	}
}

for(let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports={
	getModel:function(name){
		return mongoose.model(name)
	}
}