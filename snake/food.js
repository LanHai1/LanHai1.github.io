// Food
(function() {

    // 食物盒子
    let foodList = [];

    function Food(randomColor, width, height, x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 40;
        this.height = height || 40;
        this.bgColor = "green";

        // 随机颜色
        this.randomColor = randomColor;
    }

    /**
     * 初始化
     */
    Food.prototype.init = function(map) {

        removeFood();

        let div = document.createElement("div");

        div.style.width = `${this.width}px`;
        div.style.height = `${this.height}px`;
        this.randomColor.randomColor()

        // 将颜色保存起来
        this.bgColor = this.randomColor.random;

        div.style.backgroundColor = `${this.randomColor.random}`;
        div.style.zIndex = 10;
        div.style.borderRadius = "50%";
        div.style.position = "absolute";

        // 计算比例
        // 随机尝试位置
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width));
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height));

        div.style.left = `${this.x  * this.width}px`;
        div.style.top = `${this.y  * this.height}px`;

        // 追加到页面
        map.appendChild(div);

        // 保存食物到盒子里面
        foodList.push(div);
    }

    // 删除食物
    function removeFood() {
        for (let i = foodList.length - 1; i >= 0; i--) {
            foodList[i].parentNode.removeChild(foodList[i]);

            foodList.splice(i, 1)
        }
    }

    // 暴露Food
    window.Food = Food;
}());