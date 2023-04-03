/* 一些公共方法 */

/**
 * 格式化日期
 * @param {Object} data 日期字符串 2016-01-01 时间戳 1649757157235
 * @param {Object} format 格式字符串 如："yyyy-MM-dd HH:mm:ss" 或者 "yyyy-MM-dd AM HH:mm:ss" 或者 "2016-1-dd HH:mm:ss"
 */
function formatDateTime(data, format) {
    // 补全日期
    function supDate(val) {
        return val < 10 ? "0" + val : val;
    }

    var date = data;
    if (typeof data == "number" || !isNaN(Number(data))) {
        //时间戳转换成日期类型
        date = new Date(Number(data));
    } else if (typeof data == "string") {
        //日期类型转换成日期
        if (navigator.platform == "Win32") {
            date = new Date(data);
        } else {
            //safari/iphone 等日期格式：'2017-01-01 10:00:00'这种日期需要在中间加 T '2017-01-01T10:00:00'
            if (data.indexOf("T") > 0) {
                //方式1:
                date = new Date(data.replace(/\s/, "T"));
            } else {
                //方式2:
                date = new Date(data.replace(/-/g, "/"));
            }
        }
    }

    if (date != "Invalid Date" && typeof date != "undefined") {
        var f = format;
        f = f.replace("yyyy", date.getFullYear());
        f = f.replace("yy", (date.getFullYear() + "").substring(2, 4));
        f = f.replace("MM", supDate(date.getMonth() + 1));
        f = f.replace("dd", supDate(date.getDate()));
        f = f.replace("HH", supDate(date.getHours()));
        f = f.replace("mm", supDate(date.getMinutes()));
        f = f.replace("ss", supDate(date.getSeconds()));
        f = f.replace("fff", date.getMilliseconds());

        if (f.indexOf("AM") >= 0) {
            var hour = date.getHours();
            var amStr = "夜里";
            if (hour < 6) {
                amStr = "凌晨";
            } else if (hour < 9) {
                amStr = "早上";
            } else if (hour < 12) {
                amStr = "上午";
            } else if (hour < 14) {
                amStr = "中午";
            } else if (hour < 17) {
                amStr = "下午";
            } else if (hour < 19) {
                amStr = "傍晚";
            } else if (hour < 22) {
                amStr = "晚上";
            } else {
                amStr = "夜里";
            }
            f = f.replace("AM", amStr);
        }
        return f;
    } else {
        return data || "";
    }
}

/**
 * url参数格式化
 * @param {*} url 地址 (非必填)
 * @param {*} key url参数Key (非必填)
 * @returns
 */
function parseQueryString(url, key) {
    const ret = {};
    const href = typeof f === "string" ? url : window.location.href;
    href.replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function (k, l, m) {
        ret[l] = typeof m !== "undefined" ? decodeURIComponent(m) : "";
    });
    if (key) {
        return typeof ret[key] !== "undefined" ? decodeURIComponent(ret[key]) : null;
    }
    return ret;
}

/**
 * 防抖函数
 * @param {*} func 回调函数
 * @param {*} wait 等待时间
 * @param {*} immediate immediate=true 触发立刻执行，immediate=false 触发后等待一定时间在执行
 * @returns
 */
const debounce = (func, wait, immediate = false) => {
    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function () {
                result = func.apply(context, args);
            }, wait);
        }
        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param isTimeStamp true 表时间戳版，false 表定时器版
 */
const throttle = (func, wait, isTimeStamp) => {
    var timeout = 0,
        result;
    var throttled = function () {
        let context = this;
        let args = arguments;
        if (isTimeStamp) {
            let now = Date.now();
            if (now - timeout > wait) {
                result = func.apply(context, args);
                timeout = now;
            }
        } else {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    result = func.apply(context, args);
                }, wait);
            }
        }

        return result;
    };
    throttled.cancel = function () {
        clearTimeout(timeout);
        timeout = 0;
    };
    return throttled;
};

/**
 * 生成唯一ID
 * @returns
 */
function guid() {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * 将对象转换成base64
 * @param {*} data 字符串
 * @returns
 */
function enBase64(data) {
    if (data) {
        return window.btoa(encodeURIComponent(JSON.stringify(data)));
    } else {
        return null;
    }
}

/**
 * 将base64转换成对象
 * @param {*} base64 base64字符串
 * @returns
 */
function deBase64(base64) {
    if (base64) {
        return JSON.parse(decodeURIComponent(window.atob(base64)));
    } else {
        return null;
    }
}

/**
 * 文件大小转换
 * @param {*} a 表示要被转化的容量大小，以字节为单
 * @param {*} b 表示如果转换时出小数，四舍五入保留多少位 默认为2位小数
 * @returns
 */
function formatBytes(a, b) {
    if (0 == a) return "0 B";
    var c = 1024,
        d = b || 2,
        e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + e[f];
}

/**
 * [isMobilePhone 判断是否为手机]
 * @param  {[type]}  val [description]
 * @return {Boolean}     [description]
 */
function isMobilePhone(val) {
    return new RegExp(/^\d{11}$|^\d{3}-\d{4}-\d{4}$|^\d{3}-\d{8}$/g).test(val);
}

/**
 * [isFixedPhone 判断是否为座机]
 * @param  {[type]}  val [description]
 * @return {Boolean}     [description]
 */
function isFixedPhone(val) {
    ///^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/
    return new RegExp(/^0\d{2,3}-\d{7,8}-?(\d{1,4})?$|^0\d{2,3}\d{7,8}?$/g).test(val);
}
/**
 * [isFax 判断是否为传真]
 * @param  {[type]}  val [description]
 * @return {Boolean}     [description]
 */
function isFax(val) {
    return new RegExp(/^(\d{3,4}-)?\d{7,8}$/).test(val);
}

/**
 * [isMail 判断是否为E-Mail]
 * @param  {[type]}  val [description]
 * @return {Boolean}     [description]
 */
function isMail(val) {
    return new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g).test(val);
}

/**
 * [filterJSON wangcong 过滤JSON 中属性值为空的属性]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
function filterJSON(val) {
    try {
        var tmp = JSON.stringify(val).replace(/,?\"\w+\":""|,?\"\w+\":undefined|,?\"\w+\":null/g, "");
        return JSON.parse(tmp);
    } catch (e) {
        return val;
    }
}

/**
 * [replaceAll 替换所有]
 * @param  {[type]} val        [description]
 * @param  {[type]} pattern    [description]
 * @param  {[type]} replaceTxt [description]
 * @return {[type]}            [description]
 */
function replaceAll(val, pattern, replaceTxt) {
    if (val) {
        return val.replace(new RegExp("[" + pattern + "]", "gm"), replaceTxt);
    } else {
        return val;
    }
}

/**
 * [html2Escape 普通字符转换成转意符]
 * @param  {[type]} sHtml [description]
 * @return {[type]}       [description]
 */
function html2Escape(sHtml) {
    // return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
    return sHtml.replace(/[<>&]/g, function (c) {
        return { "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c];
    });
}

/**
 * [escape2Html 转意符换成普通字符]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function escape2Html(str) {
    var arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
        return arrEntities[t];
    });
}

/**
 * 深拷贝
 * @param {*} obj 拷贝对象
 * @returns
 */
function deepClone(obj) {
    if (obj === null || obj === undefined || obj instanceof Date) {
        return obj;
    }
    var newObj = obj.constructor == Array ? [] : {};
    for (var item in obj) {
        if (typeof obj[item] === "object") {
            newObj[item] = deepClone(obj[item]);
        } else {
            newObj[item] = obj[item];
        }
    }
    return newObj;
}

/**
 * 判断是否支持预览
 * @param {*} ext 文件扩展后缀 如：.txt .jpg
 * @returns
 */
function isPreview(ext) {
    let ext_arr = [
        `pdf`,
        `doc`,
        `docx`,
        `xls`,
        `xlsx`,
        `ppt`,
        `pptx`,
        `office`,
        `stp`,
        `jpg`,
        `png`,
        `jpeg`,
        `gif`,
        `bmp`,
        `ico`,
        `img`,
        `txt`,
        `html`,
        "3gp",
        "avi",
        "flv",
        "mp4",
        "wmv",
        "rmvb",
        "rm",
        "mpeg",
        "mpg",
        `video`
    ];
    return ext_arr.indexOf(ext) >= 0;
}

/**
 * 字符串模版处理
 * 
 * let test= {name: "wangc", age: 1};
 * let testUrl="globalInitConfig:${p2m_url},name:${test.name},age:${test.age}";
 * const result = this.strTemplate(testUrl,{test:test,...globalInitConfig});
 * 
 * @param {*} str 字符串模版
 * @param {*} obj 模版对应的对象
 * @returns 返回解析的字符串
 */
function strTemplate(str, obj) {
    return str.replace(/\$\{(.*?)\}/g, (v, key) => {
        // v => ${name}  key => name
        return key.indexOf('.') >= 0 ? eval(`obj.${key}`) : obj[key]
    })
}

/**
 * sessionStorage 扩展
 */
const sessionStorageEx = {
    //存储数据到session/cookie
    setItem: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    //获取session/cookie存储数据
    getItem: (key) => {
        var jsonObj = sessionStorage.getItem(key);

        try {
            return JSON.parse(jsonObj);
        } catch (e) {
            return jsonObj;
        }
    },
    //删除session/cookie数据
    delItem: (key) => {
        sessionStorage.removeItem(key);
    }
};

/**
 * localStorage 扩展
 */
const localStorageEx = {
    //存储数据到local
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (oException) {
            if (oException.name == "QuotaExceededError") {
                console.log("超出本地存储限额！");
                //如果历史信息不重要了，可清空后再设置
                localStorage.clear();
                localStorage.setItem(key, JSON.stringify(value));
            }
        }
    },
    //获取local存储数据
    getItem: (key) => {
        var jsonObj = localStorage.getItem(key);
        try {
            return JSON.parse(jsonObj);
        } catch (e) {
            return jsonObj;
        }
    },
    //删除local数据
    delItem: (key) => {
        localStorage.removeItem(key);
    },
    // 清除所有数据
    clear: () => {
        localStorage.clear();
    }
};

export {
    sessionStorageEx, //sessionStorage 扩展
    localStorageEx, //localStorage 扩展
    isMobilePhone, //判断是否为手机
    isFixedPhone, //判断是否为座机
    isFax, //判断是否为传真
    isMail, //判断是否为email
    isPreview, // 判断是否支持预览
    filterJSON, // 过滤掉json对象中为空的属性
    html2Escape, // 将html转义成字符串
    escape2Html, //将转义成字符串转换成html
    formatDateTime, //格式化日期
    parseQueryString, //url参数格式化
    debounce, //防抖函数
    throttle, //节流函数
    guid, //生成唯一ID
    enBase64, //将对象转换成base64
    deBase64, // 将base64转换成对象
    formatBytes, //文件大小转换
    deepClone, //深拷贝
    strTemplate //字符串模版处理
};
