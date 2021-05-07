const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
//引入文件模板,personal template from yqg;
let vue_component = require("./template/vue-component");
let vue_modal = require('./template/vue-modal');
let component = vue_component.createComponent;

const names = [
    'Vue空组件',
    'Vue空弹框',
    'Vue空table'
];

let attenStr = ''
const message = names.forEach((_, index) => {
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

function fileExist(PageConfig, hz = 'vue') {
    const { name, pageUrl } = PageConfig;
    fs.stat(pageUrl + `/${name}.${hz}`, (err, stats) => {
        console.log(err, stats, "????");
    })
}

function concatUrlAndName(PageConfig, hz) {
    const { name, pageUrl } = PageConfig;
    return `${pageUrl}/${name}.${hz}`;
}

function vue_component_func(PageConfig, buffer) {
    const buffer = component(PageConfig.name);
    addFileContent(PageConfig, buffer);
}

function addFileContent(PageConfig, buffer, hz = 'vue') {
    const { name, pageUrl } = PageConfig;
    const exist = fileExist(PageConfig);
    fs.mkdir(pageUrl, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
            return false
        };
        fs.writeFile(concatUrlAndName(PageConfig, hz), buffer, err=> {
            if (err) {
                console.log(err);
                return false
            } else {
                console.log(`目录${pageUrl} ---- ${name}添加成功，codingggggg！`);
            }
        });
    });
}

function vue_modal_func(PageConfig) {
    const buffer = 'woshiJS';
    // TODO buffer 增加一个弹框组件 可以自定义弹框的宽高
    addFileContent(PageConfig, buffer);
}


// TODO 需要判断指定文件夹下是否有重复文件 防止被覆盖掉
// 