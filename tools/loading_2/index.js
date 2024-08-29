import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss'

const loading = {
    root:null,
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

        const container = document.getElementById(loading_container.id);
        this.root = createRoot(container);
        this.root.render( <div className="kisses-spinner-border" role="status">
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>);
    },
    close: function (container_id = "body") {

        const box = document.getElementById(`loading_container_${container_id}`);
        if (!box) return console.error(`loading.close方法未找到id为${container_id}生成的容器`);

        this.root.unmount();
        const loading_container = document.getElementById(`loading_container_${container_id}`);
        loading_container.remove();
    }
}

export default loading