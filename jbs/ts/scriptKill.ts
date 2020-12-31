declare var $: any;

class ScriptKill {
    figuresNumber: number;
    constructor(figuresNumber: number) {
        this.figuresNumber = figuresNumber
    }
}

// 初始化游戏
class InitializeGame {
    // 开启初始化人物
    openInit() {
        $('.ui.modal').modal({
            blurring: true,
            centered: true
        }).modal('show')
    }
}

let init = new InitializeGame()
$(() => {
    init.openInit()

    $.fn.form.settings.rules.validationRole = function () {
        const roleName = $('#roleName').val();
        // 验证
        const roleArray = roleName.split("，")
        return roleArray.length == $('#peopleNumber').val();
    }

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
    })

    $(".open").click(() => {
        init.openInit()
    })

    // 提交剧本角色生成表单
    $(".submitScript").click(() => {
        const form = $('.ui.form.script')
        form.submit();
        let map: any = {}

        // 验证失败
        if (!$('.ui.form.script').form('is valid')) return;

        $.each(form.serializeArray(), function (this: any) {
            map[this.name] = this.value;
        });

        console.log(map);
    })
})