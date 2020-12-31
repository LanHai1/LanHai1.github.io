"use strict";
var ScriptKill = /** @class */ (function () {
    function ScriptKill(figuresNumber) {
        this.figuresNumber = figuresNumber;
    }
    return ScriptKill;
}());
// 初始化游戏
var InitializeGame = /** @class */ (function () {
    function InitializeGame() {
    }
    // 开启初始化人物
    InitializeGame.prototype.openInit = function () {
        $('.ui.modal').modal({
            blurring: true,
            centered: true
        }).modal('show');
    };
    return InitializeGame;
}());
var init = new InitializeGame();
$(function () {
    init.openInit();
    $.fn.form.settings.rules.validationRole = function () {
        var roleName = $('#roleName').val();
        // 验证
        var roleArray = roleName.split("，");
        return roleArray.length == $('#peopleNumber').val();
    };
    // 角色表单验证
    $('.ui.form.script').form({
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
                        prompt: '角色名称格式错误,请核对是否"，"分割,且是否与游戏本人数数量一致'
                    }
                ]
            },
        }
    });
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
        $.each(form.serializeArray(), function () {
            map[this.name] = this.value;
        });
        console.log(map);
    });
});
