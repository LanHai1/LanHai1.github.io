let mobile_url = "./m/index.html";
var isMobile = false;
// 检测userAgent
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}
// 跳转至手机端
if (isMobile) {
    window.location.href = mobile_url;
}