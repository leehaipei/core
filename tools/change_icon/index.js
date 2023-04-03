const changeIcon = (icon) => {
    if (!icon) {
        console.error("changeIcon中未传入icon参数");
        return;
    }
    let $favicon = document.querySelector('link[rel="icon"]');
    if ($favicon !== null) {
        $favicon.href = `./icon/${icon}.ico`;
    } else {
        $favicon = document.createElement("link");
        $favicon.rel = "icon";
        $favicon.href = `./icon/${icon}.ico`;
        document.head.appendChild($favicon);
    }
}

export default changeIcon;



/*

    使用方法

    1.引入changeIcon
    2.使用时调用changeIcon(icon)，传入的icon为要改变的图标名称，不需要传入.ico后缀
    3.在public文件夹下建一个icon文件夹，放入需要的图标，图标名称为传入的icon
    4.如果传参icon为空，会在控制台提示错误

*/