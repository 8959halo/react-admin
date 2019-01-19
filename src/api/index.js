/*
包含n个接口请求函数的模块
对ajax模块进一步封装, 让发请求的调用代码更简洁
函数返回的是promise对象

技能: 根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
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

//获取一级/二级分类列表                       ajax接收三个请求参数  url  包含所有参数数据的对象  请求方式
export const reqCategorys = (parentId) => ajax('/manage/category/list',{parentId})

//添加分类
export const reqAddCategory = (parentId,categoryName) => ajax('/manage/category/add',{parentId,categoryName},'POST')

//更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax('/manage/category/update',{categoryId,categoryName},'POST')



//获取天气
export function reqWeather(city) {

    return new Promise(function (resolve, reject) {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        //执行异步ajax请求   jsonp (url ops fn fn是必须传的 处理响应数据  )
        jsonp(
            url,
            {
                //不写时默认也是callback
                param: 'callback'
            },
            (error,data) => {
                console.log('callback',error,data)

                //如果请求成功，调用resolve方法来传递数据
                if (!error){
                    const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                    resolve({dayPictureUrl,weather})
                }else {
                    //如果请求失败，显示提示错误信息
                    alert('天气数据请求失败！')

                }

            }
        )



    })

}

//调用对应的resolve和reject
// reqWeather('北京').then(() => {}).catch(() => {})

