import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import './config.js'
import {
	BrowserRouter,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import reducers from './reducer'

import AuthRoute from './component/authroute/authroute'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import './reset.css'
import './index.css'
//开启redux的chrome调试工具
const reduxDevtools  = window.devToolsExtension?window.devToolsExtension():f=>f;

const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	reduxDevtools

));

ReactDom.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>	
	</Provider>,
	document.getElementById('root')
)