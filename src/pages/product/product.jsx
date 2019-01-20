import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

//引入所有的路由组件
import ProductIndex from './index'
import ProductSaveUodate from './save-update'
import ProductDetail from './detail'


/*
管理的商品管理路由组件
 */
export default class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/product/index' component={ProductIndex}></Route>
          <Route path='/product/save-update' component={ProductSaveUodate}></Route>
          <Route path='/product/detail' component={ProductDetail}></Route>
          <Redirect to='./product/index'/>
        </Switch>
      </div>
    )
  }
}