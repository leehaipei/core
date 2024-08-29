import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css'

const winkArrow = {
    root: null,
    open: function () {
        const winkArrow = document.createElement("div");
        winkArrow.id = "wink_arrow";
        document.body.appendChild(winkArrow);
        const container = document.getElementById(winkArrow.id);
        this.root = createRoot(container);
        this.root.render(<div className="arrow"></div>);
    },
    close: function () {
        this.root.unmount();
        const winkArrow = document.getElementById("wink_arrow");
        winkArrow.remove();
    }
}

export default winkArrow



/*

    使用方法

    1.在需要winkArrow的地方引入winkArrow
    2.在需要打开winkArrow的地方调用winkArrow.open()
    3.在需要关闭winkArrow的地方调用winkArrow.close()

*/