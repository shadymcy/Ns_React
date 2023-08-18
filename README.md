# Ns！
​	

## 上手指南

​	接下来的内容会大致描述运行项目主要的步骤，帮助你在本地机器上安装和运行该项目，进行二次开发和测试。

### 安装要求

- `node`版本，目前了解到的最好控制在14及以上的版本。
- `package.json` 文件中未记录 `lodash` 版本，需要自行另安装。
- 全局安装 `json-server` ，模拟接口。
- 未安装 `NProgress` 进度条模块，如想使用请自行安装。

### 安装步骤

clone代码  ->  初始化  ->  安装 `json-server`  ->  db文件夹启动server  ->  运行项目

- `npm install`
- `npm install -g json-server`
- `json-server --watch db.json --port 5000`
- `npm start`


## 测试

​	解释说明一下如何运行该系统的自动测试部分。


## 使用到的框架

* 涉及技术栈：`react@18`、`reactRouter@5`、`redux@4`、`antd@4`
* 第三方工具库：`axios@0.27`、`echarts`、`lodash`、`NProgress` 等

