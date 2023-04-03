import { use_authority } from '../../../src/project_config'
import _axios from '@/axios'
import openInputPass from './components/input_passwords'

const post = new _axios().post


const check_authority = () => {

    return new Promise((resolve, reject) => {
        // 配置要求权限
        if (use_authority) {
            const token = localStorage.getItem("token")
            if (token) {
                post("/api/checkToken", { "_": token }).then(res => {
                    if (res.code === 1) {
                        resolve({
                            code: 200,
                            info: "token权限鉴定成功",
                            message: res.message
                        })
                    } else {
                        resolve({
                            code: 403,
                            message: res.message,
                            info: "token权限鉴定失败"
                        })
                    }
                }).catch(error => {
                    resolve({
                        code: 404,
                        message: error,
                        info: "token权限鉴定接口错误"
                    })
                })

            } else {
                openInputPass().then(checkRes => {
                    resolve({ ...checkRes })
                })
            }
        } else {
            // 配置不要求权限，直接通过
            resolve({
                code: 200,
                message: "不要求权限"
            })
        }

    })

}


export default check_authority