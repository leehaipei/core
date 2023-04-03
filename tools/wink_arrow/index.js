import React from 'react';
import ReactDOM from "react-dom";

import './index.css'

const winkArrow = {
    open: function () {
        const winkArrow = document.createElement("div");
        winkArrow.id = "wink_arrow";
        document.body.appendChild(winkArrow);
        ReactDOM.render(
            <div className="arrow"></div>,
            document.getElementById('wink_arrow')
        );
    },
    close: function () {
        ReactDOM.unmountComponentAtNode(document.getElementById('wink_arrow'));
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