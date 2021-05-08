const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
//引入文件模板,personal template from yqg;
const vue_component = require("./template/vue-component");
const vue_modal = require('./template/vue-modal');
const vue_table = require('./template/vue-table');

const component = vue_component.createComponent;
const modal = vue_modal.createModal;
const table = vue_table.createTable;

const names = [
    'Vue空组件',
    'Vue空弹框',
    'Vue空table'
];

let attenStr = ''
names.forEach((_, index) => {
    attenStr += ` \(${index + 1}). ${_} `;
})

const questions = [
    {
        type: 'input',
        name: 'zl',
        message: `请输入你要创建的组件？${attenStr}，enter number`
    },
    {
        type: 'input',
        name: 'component_name',
        message: "请输入你要创建的组件名字，enter component name"
    },
    {
        type: 'input',
        name: 'component_path',
        message: "请输入你要创建的组件的绝对路径，enter component path"
    }
]


const start = () => {
    inquirer.prompt(questions).then(answers => {
        const config = {
            name: answers['component_name'],
            pageUrl: answers['component_path'],
        }
        // TODO 考虑是否需要增加分离版本separated和project版本（暂无需要）；
        // TODO 需要增加一个table组件
        switch (answers['zl']) {
            case '1':
                vue_component_func(config);
                break;
            case '2':
                vue_modal_func(config);
                break;
            default:
                console.log('输入的指令无效。。。');
                break;
        }
    })
}

function fileExist(pageConfig, hz = 'vue') {
    const { name, pageUrl } = pageConfig;
    fs.stat(pageUrl + `/${name}.${hz}`, (err, stats) => {
        console.log(err, stats, "????");
    })
}

function concatUrlAndName(pageConfig, hz, hasWrap = false) {
    // 是否要在组件外增加一个文件夹
    const { name, pageUrl } = pageConfig;
    return hasWrap ? `${pageUrl}/${name}/${name}.${hz}` : `${pageUrl}/${name}.${hz}`;
}

function addFileContent({
    pageConfig, // 包含生成地址path和
    buffer,
    hz = 'vue',
    hasWrap = false
}) {
    const { name, pageUrl } = pageConfig;
    const exist = fileExist(pageConfig);
    const path = hasWrap ? `${pageUrl}/${name}` : pageUrl;
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
            return false
        };
        // 是否要在组件外层增加一个文件夹hasWrap
        fs.writeFile(concatUrlAndName(pageConfig, hz, hasWrap), buffer, err => {
            if (err) {
                console.log(err);
                return false
            } else {
                console.log(`目录${pageUrl} ---- ${name}添加成功，codingggggg！`);
            }
        });
    });
}

function vue_component_func(pageConfig) {
    const buffer = component(pageConfig.name);
    addFileContent({
        pageConfig, buffer
    });
}

function vue_modal_func(pageConfig) {
    const buffer = modal(pageConfig.name,);

    addFileContent({
        pageConfig, buffer, hasWrap: true
    });
}


// TODO 需要判断指定文件夹下是否有重复文件 防止被覆盖掉
// // TODO buffer 增加一个弹框组件 可以自定义弹框的宽高
// TODO 好麻烦想把pageConfig改成全局变量。。。

module.exports = {
    start,
}