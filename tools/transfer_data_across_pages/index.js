let isSupportBroadcastChannel = typeof BroadcastChannel !== 'undefined';

/**
 * 跨页面通信，默认使用BroadcastChannel方式，低版本浏览器使用localstorge模式兼容。
 * 同时初始化时可指定通信模式
 * 
 * 示例：
 * let bc = new Broadcast('p404');
 * bc.postMessage('12345')
 * bc.postMessage({name: 12345})
 * bc.onMessage(data => {
 *   console.log(data)
 * })
 * 
 */
export default class Broadcast {
    /**
     * 初始化构造函数
     * 
     * @param {string} id 唯一标识
     * @param {string} type 通信模式
     */
    constructor(id, type = 'boradcast') {
        this.id = id;
        if (type !== 'boradcast') {
            isSupportBroadcastChannel = false;
        }
        if (isSupportBroadcastChannel) {
            this.broadcast = new BroadcastChannel(this.id);
        }
    }
    /**
     * 发送消息
     * @param {string | JSON} msg 
     */
    postMessage = (msg) => {
        if (isSupportBroadcastChannel) {
            // 同一页面无法触发消息
            this.broadcast.postMessage(msg)
        } else {
            // 解决localstorge设置同样的值，无法触发storage事件的问题
            let data = typeof msg === 'string' ? `${msg}&__t=${Date.now()}` : JSON.stringify({ ...msg, __t: Date.now() });
            localStorage.setItem(this.id, data);
        }
    }
    /**
     * 接收消息回调
     * @param {function} callback 
     */
    onMessage = (callback) => {
        if (isSupportBroadcastChannel) {
            this.broadcast.onmessage = (e) => {
                callback(e.data)
            }
        } else {
            window.addEventListener('storage', (e) => {
                if (e.key === this.id) {
                    // 传递的值为字符串
                    if (/&__t=\d{13}/.test(e.newValue)) {
                        callback(e.newValue.replace(/&__t=\d{13}/, ''))
                    } else {
                        // 传递的值为json对象
                        let { __t, ...data } = JSON.parse(e.newValue);
                        callback(data)
                    }
                }
            }, false)
        }
    }
}