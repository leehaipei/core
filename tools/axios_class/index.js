import axiosCore from "../axios";

export default class _axios {
  get(url, params, config = {}) {
    return axiosCore.get.bind(axiosCore)(url, params, config);
  }
  post(url, data, config = {}) {
    return axiosCore.post.bind(axiosCore)(url, data, config);
  }
}
/*
    使用方法：

    通过将方法通过React.Component的prototype添加到react的prototype，在任何有react的地方使用直接调用传参数即可
    React.Component.prototype.get = new _axios().get;
    React.Component.prototype.post = new _axios().post;

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
