import axios from "axios";
// import cookie from 'react-cookies'
import setupProxy from "../proxy/setup_proxy.js";

// 创建axios实例，在这里可以设置请求的默认配置
const instance = axios.create({
  timeout: 20000, // 设置超时时间
  // baseURL: baseUrl // 根据自己配置的反向代理去设置不同环境的baseUrl
});

// instance.defaults.headers.post['Content-Type'] = 'application/json'

/** 添加请求拦截器 **/
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      config.headers["token"] = token;
    }
    config._startTime = performance.now()
    return Promise.resolve(config);
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/** 添加响应拦截器  **/
instance.interceptors.response.use(
  (response) => {
    if (
      response.statusText === "OK" ||
      response.status === 200 ||
      response.status === 304
    ) {
      const token = localStorage.getItem("token") || "";
      const data = response.data;

      const duration = (performance.now() - response.config._startTime).toFixed(0);

      Object.defineProperty(data, "$duration", {
        value: Number(duration),
        writable: false,    // 只读
        enumerable: false,  // 不可枚举
        configurable: false// 不可删除、不可重配置
      })

      if (token) {
        const headers = response.headers;

        if (headers["leehaipei-clear-token"]) {
          localStorage.clear();
          window.location.reload();
          return Promise.reject(response);
        }

        if (headers["leehaipei-refresh-token"]) {
          const tokenKey = headers["leehaipei-refresh-token"];
          if (tokenKey) {
            const newToken = headers[tokenKey];
            if (newToken) {
              localStorage.setItem("token", newToken);
            }
          }
        }

        return Promise.resolve(data);
      } else {
        return Promise.resolve(data);
      }
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    // 请求报错的回调可以和后端协调返回什么状态码，在此根据对应状态码进行对应处理
    if (error.response) {
      // 做些什么
      return Promise.reject(error);
    } else {
      return Promise.reject("请求超时");
    }
  }
);

// 导出两种请求方式
export default {
  get(url, params, config = {}) {
    return new Promise((resolve, reject) => {
      instance({
        method: "get",
        url: setupProxy(url),
        params,
        ...config,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post(url, data, config = {}) {
    return new Promise((resolve, reject) => {
      instance({
        method: "post",
        url: setupProxy(url),
        data,
        ...config,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

/*
    使用方法：

    import axios from "@/axios";
    引用后直接使用axios.get()或axios.post()

*/
