let pc_url = "../index.html";
var isMobile = false;
// 检测userAgent
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}
// 跳转至PC
if (!isMobile) {
    window.location.href = pc_url;
}