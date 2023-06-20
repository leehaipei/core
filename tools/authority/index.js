import { use_authority, authority_way } from '../../../src/project_config'
import _axios from '@/axios'
import openInputPass from './components/input_passwords'
import loading from '@/loading'


const post = new _axios().post


const check_authority = () => {

    return new Promise((resolve, reject) => {
        // 配置要求权限
        if (use_authority) {
            const token = localStorage.getItem("token")
            if (token) {
                loading.open()
                post(`/api${authority_way.checkToken}`, { "_": token }).then(res => {
                    loading.close()
                    if (res.code === 1) {
                        resolve({
                            code: 200,
                            message: res.message
                        })
                    } else {
                        resolve({
                            code: 403,
                            message: res.message
                        })
                    }
                }).catch(error => {
                    resolve({
                        code: 404,
                        message: error
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