// Snake
(function() {
    // 保存小蛇的盒子
    let SnakeList = [];

    function Snake(width, height, direction) {
        this.width = width || 40;
        this.height = height || 40;

        // 小蛇身体
        this.body = [{ // 头部
            x: 3,
            y: 1,
            bgColor: "red"
        }, { // 身体
            x: 2,
            y: 1,
            bgColor: "yellow"
        }, { //身体
            x: 1,
            y: 1,
            bgColor: "hotpink"
        }]

        // 方向
        this.direction = direction || 'right';

    }

    // 初始化
    Snake.prototype.init = function(map) {
        // 先删
        removeSnake();
        for (let i = 0; i < this.body.length; i++) {
            let div = document.createElement("div");
            div.style.width = `${this.width}px`;
            div.style.height = `${this.height}px`;
            div.style.position = "absolute";
            div.style.zIndex = 9;

            div.style.backgroundColor = `${this.body[i].bgColor}`;
            div.style.left = `${this.body[i].x * this.width}px`;
            div.style.top = `${this.body[i].y * this.width}px`;

            div.style.borderRadius = "50%";

            map.appendChild(div);

            SnakeList.push(div);
        }
    }

    // 小蛇移动
    Snake.prototype.move = function(food, map) {

        // 倒叙
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        // 处理蛇头 方向
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        this.eatFood(food, map)
    }

    // 吃食物
    Snake.prototype.eatFood = function(food, map) {
        let headX = this.body[0].x;
        let headY = this.body[0].y;

        if (headX == food.x && headY == food.y) {
            let obj = this.body[this.body.length - 1]; // 蛇尾
            this.body.push({
                x: obj.x,
                y: obj.y,
                bgColor: food.bgColor
            }); // 追加一个蛇尾
            // 删除食物 食物初始化
            food.init(map)
        }
    }

    // 删除小蛇
    function removeSnake() {
        for (let i = SnakeList.length - 1; i >= 0; i--) {
            // 从页面删除
            SnakeList[i].parentNode.removeChild(SnakeList[i]);
            // 从盒子删除
            SnakeList.splice(i, 1);
        }
    }

    window.Snake = Snake;

}());