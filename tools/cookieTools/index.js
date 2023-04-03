// 保存cookie
// 参数：
// 键
// 值
// 有效期(单位:天)
// 可以访问的路径
// 可以访问的域名
// 返回值:无

function saveCookie(key, value, dayCount, path, domain) {
    let d = new Date();
    d.setDate(d.getDate() + dayCount);
    // document.cookie= `${key}=${value};expires=${d.toGMTString()}`;
    let str = `${key}=${escape(value)};expires=${d.toGMTString()}`;
    // path&&(str+=`path=${path};`);
    if (path) {
        str += `path=${path};`
    }

    if (domain) {
        str += `domain=${domain};`
    }

    document.cookie = str;
}

// 获取cookie：根据键获取值
// 参数
//   键
// 返回值：键对应的值；

function getCookie(key) {
    let str = unescape(document.cookie);
    let arr = str.split("; "); //["username=jzm","city=西安","userpass=123"]
    for (let i in arr) {
        if (arr[i].split("=")[0] == key) {
            return arr[i].split("=")[1];
        }
    }
    return null;
}

// 删除cookie
// 参数：
// 键
// 返回值:无

function removeCookie(key) {
    saveCookie(key, "byebye", -10)
}