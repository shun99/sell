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

# vue-router
- 增加别名component
webpack.base.conf.js 中配置别名component
```
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'component': resolve('src/components')
    }
```
# 1px问题
在web端1像素，可能在手机上显示不是1px引发的。
# vue-resource
# 父组件向子组件传递数据
App.vue向Header.vue传递数据。
# Header.vue
### 根据屏幕大小自动选择图片大小
```
bg-image($url)
  background-image: url($url + "@2x.png")
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image: url($url + "@3x.png")
```
### span
是行内元素，他的大小必须通过内容来撑开，设置宽高没用，通常将其 display改成 inline-block，这样不需要内容撑开，只需要设置宽高
### 超出一行展示
CSS：需要加上宽度(width:100px)、超出隐藏（overflow:hidden;）、强制在同一行显示（white-space: nowrap;）、省略号（text-overflow:ellipsis;）
```
p{width: 100px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
```
### position:absolute
absolute 是最棘手的position值。 absolute 与 fixed 的表现类似，但是它不是相对于视窗而是相对于最近的“positioned”祖先元素。如果绝对定位（position属性的值为absolute）的元素没有“positioned”祖先元素，那么它是相对于文档的 body 元素，并且它会随着页面滚动而移动。记住一个“positioned”元素是指 position 值不是 static 的元素
元素框从文档流完全删除，并相对于其包含块定位。包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。
***不要轻易设置absolute父元素的宽度，否者，当父元素内容充满，该元素会被挤出视图内，虽然absolute元素脱离了父元素的文档流，如果不设置宽度则不会被挤出*
