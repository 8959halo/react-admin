import React, {Component} from 'react'
import {Row, Col,Modal} from 'antd'
import {withRouter} from 'react-router-dom'

import {formateDate} from "../../utils/utils";
import './header.less'
import {reqWeather} from '../../api/index'
import MemoryUtils from '../../utils/MemoryUtils'
import storageUtils from '../../utils/storageUtils'

/*
头部组件
 */
  class Header extends Component {

    //初始化当前时间状态
    state = {
        sysTime: formateDate(Date.now()),
        dayPictureUrl: '',  //天气图片url
        weather: ''
    }


    //发异步请求ajax获取天气数据并更新
    getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    //启动循环定时器，每隔一秒更新一次
    getSysTime = () => {
        this.intervalId = setInterval(() => {
            //更新state
            this.setState({
                sysTime: formateDate(Date.now())
            })
        }, 1000)
    }

    //点击退出 返回登录界面
    logout = () =>{
        Modal.confirm({
            content: '确认退出吗？',
            onOk: () => {
                console.log('OK');
                //移出保存的user
                storageUtils.removeUser()
                MemoryUtils.user = []
                //跳转到login页面
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }


    componentDidMount() {
        const data = reqWeather('北京')
        console.log("callback", data)

        this.getSysTime()


        this.getWeather()
    }

    componentWillUnmount(){
        //清除定时器， 但是在这里看不到上面的局部变量ID，需要放在都可以看到的对象上
        clearInterval(this.intervalId)

    }


    render() {
        //获取信息
        const {sysTime, dayPictureUrl, weather} = this.state
        const user = MemoryUtils.user
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col>
                                {/*获取当前用户名*/}
                        <span>欢迎，{user.username}</span>
                        <a href="javascript:;" onClick={this.logout}>退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>xxx</Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{sysTime}</span>
                        <span className='weather-img'>
              <img src={dayPictureUrl} alt="weather"/>
            </span>
                        <span className='weather-detail'>{weather}</span>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default withRouter(Header)