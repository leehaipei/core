
import axios from "axios";
// import cookie from 'react-cookies'

import setupProxy from "../proxy/setup_proxy.js";

// 创建axios实例，在这里可以设置请求的默认配置
const instance = axios.create({
    timeout: 20000, // 设置超时时间10s
    // baseURL: baseUrl // 根据自己配置的反向代理去设置不同环境的baseUrl
})
// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
// instance.defaults.headers.post['Content-Type'] = 'application/json'

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers['token'] = token
    }
    return Promise.resolve(config)
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    if (response.statusText === 'OK' || response.status === 200 || response.status === 304) {
        return Promise.resolve(response.data)
    } else {
        return Promise.reject(response)
    }
}, error => {
    // 请求报错的回调可以和后端协调返回什么状态码，在此根据对应状态码进行对应处理
    if (error.response) {
        // 做些什么
        return Promise.reject(error)
    } else {
        return Promise.reject('请求超时')
    }
})


// 统一封装get，post作为一个class类
export default class _axios {

    get(url, params, config = {}) {
        return new Promise((resolve, reject) => {
            instance({
                method: 'get',
                url: setupProxy(url),
                params,
                ...config
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }

    post(url, data, config = {}) {
        return new Promise((resolve, reject) => {
            instance({
                method: 'post',
                url: setupProxy(url),
                data,
                ...config
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}


/*
    使用方法：

    已经添加到react的prototype，在任何有react的地方使用直接调用传参数即可

    this.post("url",data).then(res=>{
        // 这里是成功回调
        console.log(res)
    }).catch(err=>{
        // 这里是错误回调
        console.log(err)
    })


    this.get("url",params).then(res=>{
        // 这里是成功回调
        console.log(res)
    }).catch(err=>{
        // 这里是错误回调
        console.log(err)
    })

*/
