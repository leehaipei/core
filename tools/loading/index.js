import React from 'react';
import ReactDOM from "react-dom";

import './index.css'

const loading = {
    open: function (container_id) {

        let _box, loading_container = document.createElement("div");

        if (!container_id) {

            loading_container.id = `loading_container_body`;
            loading_container.style.position = "fixed";
            loading_container.style.top = "50%";
            loading_container.style.left = "50%";
            loading_container.style.transform = "translate(-50%, -50%)";

        } else {
            const box = document.getElementById(container_id);
            if (!box) return console.error(`loading.open方法未找到id为${container_id}的容器`);

            _box = box.getBoundingClientRect()

            loading_container.id = `loading_container_${container_id}`;

            loading_container.style.width = _box.width + "px";
            loading_container.style.height = _box.height + "px";
            loading_container.style.top = _box.top + "px";
            loading_container.style.left = _box.left + "px";
            loading_container.style.position = "absolute";
        }

        document.body.appendChild(loading_container);
        ReactDOM.render(
            <div className="spinner-border" role="status"></div>,
            document.getElementById(loading_container.id)
        );

    },
    close: function (container_id = "body") {

        const box = document.getElementById(`loading_container_${container_id}`);
        if (!box) return console.error(`loading.close方法未找到id为${container_id}生成的容器`);

        ReactDOM.unmountComponentAtNode(document.getElementById(`loading_container_${container_id}`));
        const loading_container = document.getElementById(`loading_container_${container_id}`);
        loading_container.remove();
    }
}

export default loading

/*

    使用方法

    1.在需要loading的地方引入loading
    2.在需要打开loading的地方调用loading.open("容器id")
    3.在需要关闭loading的地方调用loading.close("容器id")
    
    未传入容器id时，loading将会被添加到body中


    如需要全局使用loading，可以在src\untils\axios\index.js中的请求响应拦截器中使用


*/