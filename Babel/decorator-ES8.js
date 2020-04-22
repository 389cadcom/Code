import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import store from './store'

//@babel/plugin-syntax-dynamic-import
//修饰器的实验支持 babel-plugin-transform-decorators-legacy  @babel/plugin-proposal-decorators
//@babel/plugin-proposal-class-properties 
@withRouter
export default class App_ES8 extends Component {
  constructor(props) {
    super(props)
    store.subscribe (() => {
      this.props.history.push( store.getState().url )
    })
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
