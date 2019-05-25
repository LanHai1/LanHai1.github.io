// 颜色
(function() {
    // 随机颜色构造函数
    function Color(color) {
        // 随机颜色
        this.random = color || "green";
        // rgb
        this.colors = [255, 255, 255];

    }
    Color.prototype = {
        constructor: Color,
        // rgb 拼接
        // Color.prototype.randomColor
        randomColor: function() {
            this.colorful();
            this.random = `rgb(${this.colors[0]},${this.colors[1]},${this.colors[2]})`
        },
        // 随机数 0-255
        colorful: function() {
            for (let i = 0; i < this.colors.length; i++) {
                this.colors[i] = parseInt(Math.random() * 255)
            }
        }
    }

    window.Color = Color;
}(window));