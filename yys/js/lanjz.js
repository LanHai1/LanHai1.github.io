// 图片懒加载类
var LazyLoads = /** @class */ (function () {
    // 构造器
    function LazyLoads(el) {
        var _this = this;
        // 判断是否该图片是否可以加载
        this.canILoad = function () {
            // 循环遍历数组
            for (var i = _this.imglist.length; i--;) {
                _this.getBound(_this.imglist[i]) && _this.loadImage(_this.imglist[i], i);
            }
        };
        // 获取图片与窗口的信息
        this.getBound = function (el) {
            // 获取元素相对于视窗的位置
            var bound = el.getBoundingClientRect();
            // 获取window可视高度
            var clientHeight = window.innerHeight;
            // 判断是否需要加载数据
            return (bound.top <= clientHeight);
        };
        // 加载图片
        this.loadImage = function (el, index) {
            // 获取自定义属性
            var src = el.getAttribute('data-lanhai');
            // 赋值
            el.src = src;
            // 删除已经渲染了的图片
            _this.imglist.splice(index, 1);
        };
        this.getScroll = function () {
            // 为浏览器注册滚动时间 监测是否继续懒加载
            window.addEventListener('scroll', function () {
                _this.imglist.length && _this.canILoad();
            });
        };
        // 初始化
        this.init = function () {
            _this.canILoad();
            _this.getScroll();
        };
        // 获取图片元素 追加至数组
        this.imglist = Array.from(document.querySelectorAll(el)); // 需使用懒加载的图片集合
    }
    return LazyLoads;
}());
// 实例化对象，参数则是需要使用懒加载的图片
var start = new LazyLoads('img');
// 初始化
start.init();
