import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss'

import { authority_way } from '../../../../../src/project_config'

let isOK = null

let openInputPass = function () { }


export default openInputPass = function (config) {
    let root = null;
    if (!document.getElementById(`inputPass-container`)) {
        const div = document.createElement("div");
        div.id = "inputPass-container"
        document.getElementById(`app`).appendChild(div)
        const container = document.getElementById(`inputPass-container`);
        root = createRoot(container);
        root.render(<InputPass config={config} />);
    }

    return new Promise((resolve, reject) => {
        const timeer = setInterval(() => {
            if (isOK) {
                clearInterval(timeer)
                root.unmount();
                document.getElementById(`inputPass-container`).remove();
                resolve(isOK)
            }
        }, 500)
    })
};


class InputPass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    componentDidMount() {
        document.body.addEventListener('keydown', this.handleKey)
    }

    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.handleKey);
    }

    // 此处创建函数用箭头函数可以使得addEventListener和removeEventListener使用的是同一个函数，使用时bind或箭头函数或无名函数都会导致移除监听时调用的不是同一个函数，产生报错
    handleKey = (e) => {
        if (e.key === "Enter") { this.check() }
    }

    check() {
        const userid = document.getElementById("username").value
        const userpass = document.getElementById("password").value
        const backUser = this.props?.config?.backUser;

        if (!userid || !userpass) {
            return;
        }

        this.post(`/api${authority_way.login}`, { userid, userpass }).then(res => {
            if (res.code === 1) {
                localStorage.setItem("token", res.token)
                isOK = {
                    userid: backUser ? userid : undefined,
                    code: 200,
                    message: res.message
                }
            } else {
                isOK = {
                    code: 403,
                    message: res.message
                }
            }
        }).catch(error => {
            isOK = {
                code: 404,
                message: error
            }
        })
    }


    render() {
        const hideID = this.props?.config?.hideID;
        const buttonColor = this.props?.config?.buttonColor;
        return (
            <div className='input_passwords'>

                <div className='input_passwords_content'>

                    <div className='input_passwords_wrapper'>
                        <label htmlFor="username">用户名</label>
                        <input id='username' type={"text"} />
                    </div>

                    <div className='input_passwords_wrapper'>
                        <label htmlFor="password">密码</label>
                        <input id='password' type={"password"} />
                    </div>

                </div>

                <button className='check' style={{ backgroundColor: buttonColor || '#006FEE' }} onClick={this.check.bind(this)}>
                    登录
                </button>

                {!hideID && <p className='forgot'>
                    <a href="https://id.leehaipei.com/" target="_blank">创建账户&nbsp;|&nbsp;忘记密码</a>
                </p>}
            </div>
        );
    }
}


// const daaaa = <div className='input_passwords'>
//     <table style={{ borderCollapse: 'separate', borderSpacing: '7px 14px' }}>
//         <tbody>
//             <tr>
//                 <td>用户名:</td>
//                 <td>
//                     <input id='username' type={"text"} />
//                 </td>
//             </tr>
//             <tr>
//                 <td>密码:</td>
//                 <td>
//                     <input id='password' type={"password"} />
//                 </td>
//             </tr>
//         </tbody>
//     </table>
//     <button className='check' onClick={this.check.bind(this)}>
//         登录
//     </button>

//     <p className='forgot'>
//         <a href="https://id.leehaipei.com/" target="_blank">创建账户/忘记密码</a>
//     </p>
// </div>