import { use_authority, authority_way } from '../../../src/project_config'
import openInputPass from './components/input_passwords'
import loading from '@/loading'
import axios from '@/axios'
import generateCanvasFingerprint from '@/webFingerprint/generateCanvasFingerprint'


const check_authority = (config) => {

    return new Promise(async (resolve, reject) => {
        // 配置要求权限
        if (use_authority) {
            const token = localStorage.getItem("token")
            if (token) {
                loading.open()
                const canvasFingerprint = await generateCanvasFingerprint();
                axios.post(`/api${authority_way.checkToken}`, {
                    backUser: config?.backUser,
                    token: canvasFingerprint
                })
                    .then(res => {
                        if (res.code === 1) {
                            let obj = {
                                code: 200,
                                message: res.message
                            }
                            if (config?.backUser) {
                                obj.userid = res.userid
                            }
                            resolve(obj)
                        } else {
                            resolve({
                                code: 403,
                                message: res.message,
                                config
                            })
                        }
                    }).catch(error => {
                        resolve({
                            code: 404,
                            message: error,
                            config
                        })
                    }).finally(() => {
                        loading.close()
                    })

            } else {
                openInputPass(config).then(checkRes => {
                    resolve({ ...checkRes, config })
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