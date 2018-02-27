import React from 'react'

export default function hocForm (Comp) {
  return class WrapperComp extends React.Component {
 	constructor(props){
 		super(props)
 		this.state = {}
	    this.handleChage = this.handleChage.bind(this)
 	}
	handleChage(key,value){
		this.setState({
			[key]:value
		})
	}
  	render () {
	  return <Comp {...this.props} handleChage={this.handleChage} state={this.state}></Comp>
  	}
  }
}