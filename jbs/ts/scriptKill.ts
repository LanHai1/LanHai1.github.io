declare var $: any;
interface JBSMap {
    scriptName: string
    roleName: string
    peopleNumber: number
}

class ScriptKill {
    protected figureArr: Array<string | undefined>;
    // 渲染层
    static renderArr: Array<any> = [];
    constructor(figureArr: Array<string | undefined>) {
        this.figureArr = figureArr;
    }
    // 还原时间 reductionTime("0212",2,":")
    reductionTime(soure: string, start: number, newStr: string) {
        return soure.slice(0, start) + newStr + soure.slice(start);
    }
    // 生成时间人物样式
    generateFigure(el: Element) {
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
        let [virtualThead, virtualTbody, recordSizeMax, maxRecordSize, storeTime]: [string, string, Array<number>, number, Array<number>] = [``, `<tr><td>约翰</td><td>已审核</td><td>None</td>¬</tr>`, [], 0, []]
        console.log(ScriptKill.renderArr);

        // 生成th 
        ScriptKill.renderArr.forEach((v: any, i) => {
            virtualThead += `
                <th class="tableTh">
                    <p><img src="./img/0${i + 1}.png" alt=""></p>
                    <p class="figureName">${v.name}</p>
                </th>`;

            recordSizeMax.push(+v.recordSize);

            if (!i && v.recordSize) {
                v.dom.forEach((v1: any) => {
                    // 获取时间key
                    for (const key in v1) {
                        if (Object.prototype.hasOwnProperty.call(v1, key)) {
                            storeTime.push(+(key.replace(/:/g, '')))
                        }
                    }
                })
            }
            console.log(v.dom);

            // let virtualTbodyRow = "";
            // virtualTbody += `
            //      <tr>
            //         <td></td>
            //      </tr>
            // `;
        })

        maxRecordSize = Math.max(...recordSizeMax);

        if (maxRecordSize) {
            // 时间排序 最小=>最大
            storeTime.sort((a, b) => a - b)
            console.log(maxRecordSize, "123", storeTime);
            for (let index = 0; index < storeTime.length; index++) {
                console.log(index, storeTime[index]);
            }
        }

        let virtualDom = `
            <thead><tr class="tableThTr">${virtualThead}</tr></thead>
            <tbody>${virtualTbody}</tbody>`;

        $(el).append(virtualDom)


        // < div class="ui mini input input-group clockpicker" style = "width: 100%;" >
        //     <input type="text" class="form-control" value = "09:30" placeholder = "请选择时间" >
        //         <span class="input-group-addon" >
        //             <span class="glyphicon glyphicon-time" > </span>
        //                 < /span>
        //                 < /div>

        $('.clockpicker').clockpicker();

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

        // 预知提前生成人物
        ScriptKill.renderArr = []
        // 处理dom渲染组
        const renderArr = sk.figureArr.map((v: string, i: number) => { return { name: v, dom: [{ "12:12": "测试1" }], recordSize: 1 } })
        renderArr.unshift({ name: "时间线", dom: [{ "12:12": "测试1" }, { "02:12": "测试" }], recordSize: 2 });
        ScriptKill.renderArr = [...renderArr];

        sk.generateFigure($(".timelineTable"));

        $('.ui.modal').modal('hide')
    })

    // 取消重置
    $("#cancel").click((): void => {
        $('.ui.modal').modal('hide')
        $('.script')[0].reset();
    })

})