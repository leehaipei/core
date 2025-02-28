import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

import { authority_way } from '../../../../../src/project_config'

let isOK = null

window.openInputPass = function () { };

let openInputPass = function () { }


export default openInputPass = function (params) {
    if (!document.getElementById(`inputPass-container`)) {
        const div = document.createElement("div");
        div.id = "inputPass-container"
        document.getElementById(`root`).appendChild(div)
        ReactDOM.render(
            <InputPass />,
            document.getElementById(`inputPass-container`)
        );
    }

    openInputPass(params);

    return new Promise((resolve, reject) => {
        const timeer = setInterval(() => {
            if (isOK) {
                clearInterval(timeer)
                ReactDOM.unmountComponentAtNode(document.getElementById(`inputPass-container`));
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
        // require('./index.scss')
        openInputPass = params => { };
        document.body.addEventListener('keydown', this.handleKey)
    }

    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.handleKey);
    }

    // 此处创建函数用箭头函数可以使得addEventListener和removeEventListener使用的是同一个函数，使用时bind或箭头函数或无名函数都会导致移除监听时调用的不是同一个函数，产生报错
    handleKey = (e) => {
        if (e.key === "Enter") { this.login() }
    }

    login() {
        const userid = document.getElementById("username").value
        const userpass = document.getElementById("password").value

        this.post(`/api${authority_way.login}`, { userid, userpass }).then(res => {
            if (res.code === 1) {
                localStorage.setItem("token", res.token)
                isOK = {
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
        return (
            <div className='input_passwords'>
                <table>
                    <tbody>
                        <tr>
                            <td>username:</td>
                            <td>
                                <input id='username' type={"text"} />
                            </td>
                        </tr>
                        <tr>
                            <td>password:</td>
                            <td>
                                <input id='password' type={"password"} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='login' onClick={this.login.bind(this)}>
                    login
                </div>
            </div>
        );
    }
}