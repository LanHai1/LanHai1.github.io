"use strict";
var ScriptKill = /** @class */ (function () {
    function ScriptKill(figureArr) {
        this.figureArr = figureArr;
    }
    // 生成时间人物样式
    ScriptKill.prototype.generateFigure = function (el) {
        console.log(this.figureArr, el);
        this.figureArr.forEach(function (v, i) {
            el.append("\n            <div class=\"column timeline timelineFigure\" data-figure-name=\"" + v + "\" data-id=\"" + i + "\">\n                <p><img src=\"./img/0" + (i + 1) + ".png\" alt=\"\"></p>\n                <p class='figureName'>" + v + "</p>\n            </div>\n            ");
        });
        // 人物头像点击
        $(".timelineFigure img").on("click", function () {
            var outerLayer = $(this).parent().parent();
            console.log(outerLayer.data("figure-name"));
            console.log(outerLayer.data("id"));
        });
    };
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
        // 预知提前生成人物
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
        sk.generateFigure($("#timelines"));
        $('.ui.modal').modal('hide');
    });
    // 取消重置
    $("#cancel").click(function () {
        $('.ui.modal').modal('hide');
        $('.script')[0].reset();
    });
});
