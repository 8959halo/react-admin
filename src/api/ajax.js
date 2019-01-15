/*
用来发送ajax请求的函数模块
内部封装axios
函数的返回值为promise对象
目标:
  1. 请求错误统一处理
  2. 异步返回的是data, 而不是response
解决: 自定义promsie对象
 */
import axios from 'axios'
import {message} from 'antd'


export default function ajax(url, data ={}, method = 'GET') {
    if (method ==='GET'){
      return axios.get(url,{params:data})
    }else{
      return axios.post(url,data)
    }
}

 async function reqLogin() {
  //返回的是一个promise， 但是axios异步调了response 现在还不是一个response 需要await
    const response = await ajax('/login', {username: 'jerry',password:'123'},'POST')
     //取出response响应体数据data
    const result = response.data
    if (result.status===1){

    }

}



/*
export default function ajax(url, data={}, method='GET') {

  return new Promise((resolve, reject) => {
    let promise
    // 使用axios执行异步ajax请求
    if(method==='GET') {
      promise = axios.get(url, {params: data})
    } else {
      promise = axios.post(url, data)
    }
    // 如果请求成功了, 调用resolve()
    promise.then(response => {
      resolve(response.data) // 后面异步得到的就是data数据
    // 如果请求失败了, 显示提示:请求出错了
    }).catch(error => {
      console.log(url, error)
      message.error('请求出错了')
    })
  })
}
*/


/*
async function reqLogin() {
  const result = await ajax('/login', {username: 'tom', password: '123'}, 'POST')
  if(result.status===0) {
    alert('成功了')
  } else {
    alert('失败了')
  }
}*/
