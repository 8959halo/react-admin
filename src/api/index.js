/*
包含n个接口请求函数的模块
对ajax模块进一步封装, 让发请求的调用代码更简洁
函数返回的是promise对象

技能: 根据接口文档定义接口请求函数
 */
import ajax from './ajax'
const BASE = 'http://localhost:5000'


/*
//登录
export const reqLogin =(username,password) => ajax('/login', {username,password},'POST')
//添加用户
export const reqAdd = () => ajax('/manage/user/add',user,'POST')


*/

// 登陆
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

//获取天气
export function reqWeather(city) {
    return new Promise(function (resolve, reject) {
        //执行异步ajax请求
        jsonp(
            url,
        {
            param :'callback'
        },
            (error,data) =>{
                console.log('callback',error,data);

            }
            )
        //如果请求成功，调用resolve方法来传递数据

        //如果请求失败，显示提示错误信息
    })

    }

