const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
//引入配置文件
const profileData = require("./template/data")
//引入文件模板
let template = require("./template/template");
let vue_component = require("./template/vue-component");
let page = template.page;
let component = vue_component.createComponent;

const PageConfig = {
    name: 'firstPageComponet',
    pageUrl: '/Users/yqg/Desktop/workspace/szl_personal_project/hello-xxx/page',
}

function easyCreateFile(PageConfig) {

    createFile(pageUrl);

}

function createFile(pageUrl) {
    // 创建目录 TODO 增加判断文件夹重复
    fs.mkdirSync(path.dirname(pageUrl));
}

var questions = [
    {
        type: 'input',
        name: 'zl',
        message: "请输入你要创建的组件？（1）Vue空组件"
    },
    {
        type: 'input',
        name: 'component_name',
        message: "请输入你要创建的组件名字"
    },
    {
        type: 'input',
        name: 'component_url',
        message: "请输入你要创建的组件的绝对路径"
    }
]

inquirer.prompt(questions).then(answers => {
    switch (answers['zl']) {
        case '1':
            addFileContent({
                name: answers['component_name'],
                pageUrl: answers['component_url'],
            });
            break;
    
        default:
            console.log('输入的指令无效。。。');
            break;
    }
})

function fileExist(PageConfig) {
    const { name, pageUrl } = PageConfig;
    fs.stat(pageUrl + `/${name}.vue`, (err,stats) => {
        console.log(err, stats, "????");
    })
}

function addFileContent(PageConfig) {
    const { name, pageUrl } = PageConfig;
    const exist = fileExist(PageConfig);
    if (!exist) {
        console.log(`该文件${name}已在${pageUrl}目录下存在了！`);
        return false;
    }
    fs.mkdir(pageUrl, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
            return false
        };
        const buffer = component(name);
        fs.writeFile(pageUrl + `/${name}.vue`, buffer, function (err) {
            if (err) {
                console.log(err);
                return false
            } else {
                console.log(`${pageUrl}/${name}.vue创建成功----`);
            }
        });
    });
}




// 递归创建目录 同步方法
// function mkdirsSync(dirname) {
//     if (fs.existsSync(dirname)) {
//         return true;
//     } else {
//         if (mkdirsSync(path.dirname(dirname))) {
//             fs.mkdirSync(dirname);
//             return console.log(`创建目录成功-${dirname}`);
//         }
//     }   
// }
// //遍历配置文件并调用创建目录方法
// profileData.data.forEach((item) => {
//     if(item.folder){
//         mkdirsSync(`./pages/${item.folder}`)
//     }
// })

// //遍历创建文件
// profileData.data.forEach((item) => {
//     if(item.file){
//         //创建API文件
//         if(item.file.indexOf("api") != -1){
//             fs.writeFile(`./pages/${item.folder}/${item.file}`, api, function(err){
//                 if(err){
//                     return console.log('创建失败', err);
//                 }
//                 console.log(`创建文件成功！-${item.file}`);
//             })
//         }

//         //创建route文件
//         if (item.file.indexOf("route") != -1){
//             fs.writeFile(`./pages/${item.folder}/${item.file}`, route, function(err){
//                 if(err){
//                     return console.log('创建失败', err);
//                 }
//                 console.log(`创建文件成功！-${item.file}`);
//             })
//         }

//         //创建主体页面
//         if (item.className){
//             fs.writeFile(`./pages/${item.folder}/${item.file}`, page(item.className), function(err){
//                 if(err){
//                     return console.log('创建失败', err);
//                 }
//                 console.log(`创建文件成功！-${item.file}`);
//             })
//         } 
//     }
// })