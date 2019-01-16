import React, {Component} from 'react'
import {Row, Col} from 'antd'

import {formateDate} from "../../utils/utils";
import './header.less'

/*
头部组件
 */
export default class Header extends Component {

    //初始化当前时间状态
    state = {
        sysTime: formateDate(Date.now())
    }

    componentDidMount(){
        //启动循环定时器，每隔一秒更新一次
       this.intervalId = setInterval(() =>{
            //更新state
            this.setState({
                sysTime: formateDate(Date.now())
            })
        },1000)
    }

    componentWillUnmount(){
        //清除定时器， 但是在这里看不到上面的局部变量ID，需要放在都可以看到的对象上
        clearInterval(this.intervalId)

    }



    render() {
        const {sysTime} = this.state
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col>
                        <span>欢迎，xxx</span>
                        <a href="javascript">退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>xxx</Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{sysTime}</span>
                        <span className='weather-img'>
              <img src="" alt=""/>
            </span>
                        <span className='weather-detail'>晴</span>
                    </Col>
                </Row>

            </div>
        )
    }
}