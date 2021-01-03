declare var $: any;
interface JBSMap {
    scriptName: string
    roleName: string
    peopleNumber: number
}

class ScriptKill {
    protected figureArr: Array<string | undefined>;
    constructor(figureArr: Array<string | undefined>) {
        this.figureArr = figureArr;
    }
    // 生成时间人物样式
    generateFigure(el: Element) {
        console.log(this.figureArr, el);
        this.figureArr.forEach((v, i) => {
            el.append(`
            <div class="column timeline timelineFigure" data-figure-name="${v}" data-id="${i}">
                <p><img src="./img/0${i + 1}.png" alt=""></p>
                <p class='figureName'>${v}</p>
            </div>
            `)
        })

        // 人物头像点击
        $(".timelineFigure img").on("click", function (this: any) {
            const outerLayer = $(this).parent().parent();
            console.log(outerLayer.data("figure-name"));
            console.log(outerLayer.data("id"));
        });
    }
}

// 初始化游戏
class InitializeGame {
    // 验证规则
    static validationRules: object = {
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
    }
    // 开启初始化人物
    openInit() {
        $('.ui.modal').modal({ blurring: true, centered: true }).modal('setting', 'closable', false).modal('show');
    }
}

const init = new InitializeGame();
let sk: any;

$(() => {
    init.openInit()

    // 自定义规则
    $.fn.form.settings.rules.validationRole = (): boolean => {
        const roleName = $('#roleName').val();
        // 验证 清除无效角色名
        let roleArray = roleName.split("，").filter((v: string | undefined) => v);

        const flag = roleArray.length == $('#peopleNumber').val();

        // 预知提前生成人物
        if (flag) sk = new ScriptKill(roleArray);
        return flag;
    }

    // 角色表单验证
    $('.ui.form.script').form(InitializeGame.validationRules)

    $(".open").click((): void => {
        init.openInit();
    })

    // 提交剧本角色生成表单
    $(".submitScript").click((): void => {
        const form = $('.ui.form.script')
        form.submit();
        let map: any = {};

        // 验证失败
        if (!$('.ui.form.script').form('is valid')) return;

        // 解析数据
        $.each(form.serializeArray(), function (this: any) {
            map[this.name] = this.value;
        });

        sk.generateFigure($("#timelines"));

        $('.ui.modal').modal('hide')
    })

    // 取消重置
    $("#cancel").click((): void => {
        $('.ui.modal').modal('hide')
        $('.script')[0].reset();
    })

})