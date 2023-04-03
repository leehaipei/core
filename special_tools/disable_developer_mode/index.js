document.body.onselectstart =
    document.body.oncontextmenu =
    function () {
        return false;
    };
document.onkeydown = function (e) {
    if (e.code === "F12") {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
}



// 另一个方式引用tool

// default options
// ConsoleBan.init()
// custom options
// ConsoleBan.init({
//     redirect: 'https://leehaipei.com'
// })