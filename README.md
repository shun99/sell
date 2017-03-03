> 这是一个慕课网基于vue的一个学习教程。

# init
初始化工程
# 模拟数据
# 引入字体
创建项目目录
# 修改配置
- 删除一些不必要的文件
- 引入reset.css
- 修改.eslintrc.js，更改检查配置，必须添加分号，忽略缩进检查
```
 'semi': ['error', 'always'],
 'indent': 0
```
# 修复bug
- 当new一个对象为指定变量名时需要添加如下注释，规避检查
```
/* eslint-disable no-new */
```
否则
```
 ✘  http://eslint.org/docs/rules/no-new  Do not use 'new' for side effects
  /Users/yghysdr/Study/web/sell/src/main.js:9:1
  new Vue({
   ^
```
- 如果在new Router声明routes字段，则不能为空
```
export default new Router({
  routes: [
    {
    }
  ]
});
```
否则
```
Uncaught Error: [vue-router] "path" is required in a route configuration.
```
# Header, Tab组件

# 安装stylus-loader
需要安装stylus
```
"stylus": "^0.54.5",
"stylus-loader": "^2.5.0",
```
