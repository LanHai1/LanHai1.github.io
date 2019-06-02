// 图片懒加载类
class LazyLoads {
    imglist;
    // 构造器
    constructor(el) {
        // 获取图片元素 追加至数组
        this.imglist = Array.from(document.querySelectorAll(el)); // 需使用懒加载的图片集合
    }

    // 判断是否该图片是否可以加载
    canILoad = () => {
        // 循环遍历数组
        for (let i = this.imglist.length; i--;) {
            this.getBound(this.imglist[i]) && this.loadImage(this.imglist[i], i);
        }
    }
    // 获取图片与窗口的信息
    getBound = (el) => {
        // 获取元素相对于视窗的位置
        let bound = el.getBoundingClientRect();
        // 获取window可视高度
        let clientHeight = window.innerHeight;
        // 判断是否需要加载数据
        return (bound.top <= clientHeight);
    }
    // 加载图片
    loadImage = (el, index) => {
        // 获取自定义属性
        let src = el.getAttribute('data-lanhai');
        // 赋值
        el.src = src;
        // 删除已经渲染了的图片
        this.imglist.splice(index, 1);
    }

    getScroll = () => {
        // 为浏览器注册滚动时间 监测是否继续懒加载
        window.addEventListener('scroll', () => {
            this.imglist.length && this.canILoad();
        });
    }
    // 初始化
    init = () => {
        this.canILoad();
        this.getScroll();
    }
}
// 实例化对象，参数则是需要使用懒加载的图片
let start = new LazyLoads('img')
// 初始化
start.init()