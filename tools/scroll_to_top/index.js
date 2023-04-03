function scrollToTop() {
    let timer = setInterval(function () {
        var topH = document.documentElement.scrollTop || document.body.scrollTop;
        var stepLength = Math.ceil(topH / 5);
        document.documentElement.scrollTop = document.body.scrollTop = topH - stepLength;
        if (topH === 0) {
            clearInterval(timer);
        }
    }, 50);
}
export default scrollToTop;


/*

    使用方法

    在需要使用的地方引入并调用scrollToTop()

*/