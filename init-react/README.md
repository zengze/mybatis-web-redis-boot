
react
redux
react-redux
react-dom
react-router
react-saga   --- 最终异步方案
immutable

redux-action-tools  http://react-china.org/t/redux/8761 几个异步方案对比

--src
----common  公共模块代码
----constants  常用变量
----containers  所有容器（页面）
    ----xxxx
        ----actions xxxx页面的所有动作 （redux）
        ----components xxxx页面的所有组件
        ----reducer xxxx页面的reducer （redux）
        ----sagas xxxx页面的saga（redux-saga）
        ----index.js 导出所有配置及组件 供别的页面重用，和主配置文件使用
        ----xxxxContainer.js
----store router redux saga 配置
--index.js 主入口文件

Q2.How to run it in development mode.
A2:npm run dev

Q3.How to solve the below problem:
A3.1 npm ERR! Windows_NT 10.0.14393
npm ERR! argv "C:\\Program Files\\nodejs\\node.exe" "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js" "run" "dev"
npm ERR! node v6.10.3
npm ERR! npm  v3.10.10
npm ERR! code ELIFECYCLE
npm ERR! xxxManagementSystem@1.0.0 dev: `webpack-dev-server`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the xxxManagementSystem@1.0.0 dev script 'webpack-dev-server'.

A3.1 The reason for this problem some lib are absent in your machine.You have to install it by executing the following command.
npm install

Q4:After changing the ip of my service,what else shall i change at the same time? 
A4:you must changes some lines in the file: ManagementSystem\src\constants\Api.js
)
