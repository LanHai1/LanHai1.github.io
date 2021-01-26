"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var ScriptKill = /** @class */ (function () {
    function ScriptKill(figureArr) {
        this.figureArr = figureArr;
    }
    // 还原时间 reductionTime("0212",2,":")
    ScriptKill.prototype.reductionTime = function (soure, start, newStr) {
        return soure.slice(0, start) + newStr + soure.slice(start);
    };
    // 生成时间人物样式
    ScriptKill.prototype.generateFigure = function (el) {
        console.log(this.figureArr, el, ScriptKill.renderArr);
        // this.figureArr.forEach((v, i) => {
        //     el.append(`
        //     <div class="column timeline timelineFigure figure${i + 1}" data-figure-name="${v}" data-id="${i + 1}">
        //         <p><img src="./img/0${i + 1}.png" alt=""></p>
        //         <p class='figureName'>${v}</p>
        //         <div class="addPlus"><i class="plus circle icon"></i></div>
        //     </div>
        //     `)
        // })
        /**
         * virtualThead: 虚拟th
         * virtualTbody: 虚拟tb
         * recordSizeMax: 存放每个角色任务节点树
         * maxRecordSize: 最大任务节点数值
         * storeTime: 存放时间
         */
        var _a = ["", "<tr><td>\u7EA6\u7FF0</td><td>\u5DF2\u5BA1\u6838</td><td>None</td>\u00AC</tr>", [], 0, []], virtualThead = _a[0], virtualTbody = _a[1], recordSizeMax = _a[2], maxRecordSize = _a[3], storeTime = _a[4];
        console.log(ScriptKill.renderArr);
        // 生成th 
        ScriptKill.renderArr.forEach(function (v, i) {
            virtualThead += "\n                <th class=\"tableTh\">\n                    <p><img src=\"./img/0" + (i + 1) + ".png\" alt=\"\"></p>\n                    <p class=\"figureName\">" + v.name + "</p>\n                </th>";
            recordSizeMax.push(+v.recordSize);
            if (!i && v.recordSize) {
                v.dom.forEach(function (v1) {
                    // 获取时间key
                    for (var key in v1) {
                        if (Object.prototype.hasOwnProperty.call(v1, key)) {
                            storeTime.push(+(key.replace(/:/g, '')));
                        }
                    }
                });
            }
            console.log(v.dom);
            // let virtualTbodyRow = "";
            // virtualTbody += `
            //      <tr>
            //         <td></td>
            //      </tr>
            // `;
        });
        maxRecordSize = Math.max.apply(Math, recordSizeMax);
        if (maxRecordSize) {
            // 时间排序 最小=>最大
            storeTime.sort(function (a, b) { return a - b; });
            console.log(maxRecordSize, "123", storeTime);
            for (var index = 0; index < storeTime.length; index++) {
                console.log(index, storeTime[index]);
            }
        }
        var virtualDom = "\n            <thead><tr class=\"tableThTr\">" + virtualThead + "</tr></thead>\n            <tbody>" + virtualTbody + "</tbody>";
        $(el).append(virtualDom);
        // < div class="ui mini input input-group clockpicker" style = "width: 100%;" >
        //     <input type="text" class="form-control" value = "09:30" placeholder = "请选择时间" >
        //         <span class="input-group-addon" >
        //             <span class="glyphicon glyphicon-time" > </span>
        //                 < /span>
        //                 < /div>
        $('.clockpicker').clockpicker();
        // 人物头像点击
        $(".timelineFigure img").on("click", function () {
            var outerLayer = $(this).parent().parent();
            console.log(outerLayer.data("figure-name"));
            console.log(outerLayer.data("id"));
        });
    };
    // 渲染层
    ScriptKill.renderArr = [];
    return ScriptKill;
}());
// 初始化游戏
var InitializeGame = /** @class */ (function () {
    function InitializeGame() {
    }
    // 开启初始化人物
    InitializeGame.prototype.openInit = function () {
        $('.ui.modal').modal({ blurring: true, centered: true }).modal('setting', 'closable', false).modal('show');
    };
    // 验证规则
    InitializeGame.validationRules = {
        on: 'blur',
        fields: {
            scriptName: {
                identifier: 'scriptName',
                rules: [
                    {
                        type: 'empty',
                        prompt: '剧本名字不能为空'
                    }
                ]
            },
            roleName: {
                identifier: 'roleName',
                rules: [
                    {
                        type: 'empty',
                        prompt: '角色名称不能为空'
                    },
                    {
                        type: 'validationRole',
                        prompt: '角色名称格式错误,请核对是否"，"分割,且是否与游戏人数数量一致'
                    },
                    {
                        type: 'validationRole',
                        prompt: '例:角1，角2'
                    }
                ]
            },
        }
    };
    return InitializeGame;
}());
var init = new InitializeGame();
var sk;
$(function () {
    init.openInit();
    // 自定义规则
    $.fn.form.settings.rules.validationRole = function () {
        var roleName = $('#roleName').val();
        // 验证 清除无效角色名
        var roleArray = roleName.split("，").filter(function (v) { return v; });
        var flag = roleArray.length == $('#peopleNumber').val();
        if (flag)
            sk = new ScriptKill(roleArray);
        return flag;
    };
    // 角色表单验证
    $('.ui.form.script').form(InitializeGame.validationRules);
    $(".open").click(function () {
        init.openInit();
    });
    // 提交剧本角色生成表单
    $(".submitScript").click(function () {
        var form = $('.ui.form.script');
        form.submit();
        var map = {};
        // 验证失败
        if (!$('.ui.form.script').form('is valid'))
            return;
        // 解析数据
        $.each(form.serializeArray(), function () {
            map[this.name] = this.value;
        });
        // 预知提前生成人物
        ScriptKill.renderArr = [];
        // 处理dom渲染组
        var renderArr = sk.figureArr.map(function (v, i) { return { name: v, dom: [{ "12:12": "测试1" }], recordSize: 1 }; });
        renderArr.unshift({ name: "时间线", dom: [{ "12:12": "测试1" }, { "02:12": "测试" }], recordSize: 2 });
        ScriptKill.renderArr = __spreadArrays(renderArr);
        sk.generateFigure($(".timelineTable"));
        $('.ui.modal').modal('hide');
    });
    // 取消重置
    $("#cancel").click(function () {
        $('.ui.modal').modal('hide');
        $('.script')[0].reset();
    });
});
