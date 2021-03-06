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

> webpack.base.conf.js 中配置别名component

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
### 修复头组件内容溢出
overflow: hidden
这个属性定义溢出元素内容区的内容会如何处理。
visible	默认值。内容不会被修剪，会呈现在元素框之外。
hidden	内容会被修剪，并且其余内容是不可见的。
scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
auto	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
inherit	规定应该从父元素继承 overflow 属性的值。
# Sticky Footer
# flex 自适应
# star

## Star.vue
### stylus的& 提高类的等级，使得与父元素同级。
如下，star-48与star同级别，on与star-item同级别。*虽然on与star-item同级别，但是只有使用了star-item才能使用到on*

```
.star
    font-size: 0
    .star-item-1
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
```
如下，当直接使得on与star-item同级别，而不是通过&来提升级级别的时候，*不使用star-item也能使用到on*
```
.star
    font-size: 0
    .star-item-1
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
      :last-child
        margin-right: 0
      .on
        bg-image('star48_on')
      .half
        bg-image('star48_half')
      .off
        bg-image('star48_off')
```
# 弹窗动画
# Goods.vue
goods侧边栏的处理。
### 垂直居中方式
- table

```
parent{
    display: table
}
child{
     display: table-cell
     vertical-align: middle
}
```
child大小会占满parent，child内部居中。
- flex布局

```
.parent{display:flex;align-items:center;}
```
child会包裹内容，然后在父布局居中。
# Good.vue content
写content布局
# 列表滚动
- vue2.0 ref

```
<!-- vm.$refs.p will be the DOM node -->
<div ref="p">hello</div>
```
ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例:

# 列表联动
### 计算属性

#### 计算属性计算数据
> 我们可以将同一函数定义为一个 method 而不是一个计算属性。对于最终的结果，两种方式确实是相同的。
然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。
这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，
而不必再次执行函数。
#### 计算属性监听数据
> 计算属性里面用到this指向的值发生变化时，使用这个计算属性的地方也会发生相应的变化。
因为计算属性本身也是数据，methods方法不是数据，是方法，这符合mvvm的思想，也正是如此
计算属性不仅可以计算，也可以用来监听某一数据的变化。

```
//调用方式reversedMessage()
methods: {
  reversedMessage: function () {
    return Date.now()
  }
}
//调用方式reversedMessage
computed: {
  reversedMessage: function () {
    return Date.now()
  }
}
```
# ShopCard
购物车样式
# ShopCardControl
# 动画
# ShopCard与ShopCardControl联动
# 购物车商品列表
# 添加弹出动画
在chrome中会颤动，但在手机上不会出现。完善细节

# 商品详情
- 占位图

```
 .header-wrapper
      position: relative
      width: 100%
      height: 0px
      padding-bottom: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
```
# 商品详情内数据联动
# 完善商品详情
切记在创建BScroll时先判断scroll是否已经存在，如果存在了再次创建可能点击事件会响应两次。
```
if (!this.scroll) {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.foodScroll, {
                click: true
              });
            });
          } else {
            this.scroll.refresh();
          }
```
# rating.vue
# seller.vue ui
# seller的滚动
## 竖向滚动
当刷新Seller页面是，App.vue的网络请求是异步进行的，seller布局会完成，seller还没获取到，
此时_initScroll
```
 created () {
      this.$nextTick(() => {
        console.log(this.seller);
        this._initScroll();
      });
    },
```
无法获取准确高度，因此就要监听seller，当seller获取到时，在刷新Scroll即可
```
watch: {
      'seller' () {
        console.log(this.seller);
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    },
```
当只使用watch时，当从别的vue切换到seller.vue时，seller并没刷新，因此此时_initScroll也不行，
当时从别的vue进入seller.vue会执行created，所以在created里_initScroll即可。所以两者应该配合使用。
# 横向滚动
> 切记首先计算横向滚动的宽度。

```
  _initPicScroll () {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picListWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
```
# 喜欢数据保存到本的
> 为了区分不同商品，需要一个唯一的商品id，例如此处取url
```
http://localhost:8080/?id=123#/sellers
```
中的id作为唯一标示。

- App.vue中，给Seller添加唯一标识

```
 //添加标识
 data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })(),
        }
      };
    }
 //赋值数据
 methods: {
       getSeller: function () {
         this.$http.get('/api/seller').then(response => {
           if (response.body.errNo === NO_ERR) {
             /***
              * 这样回覆盖原来seller已有的数据。
              * this.seller = response.body.data;
              * 在不覆盖原来数据的前提下添加数据。
              */
             this.seller = Object.assign({}, this.seller, response.body.data);
           }
         });
       }
     },
```
- 在使用的地方取出id

```
favoriteStatus (event) {
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
```
# 部署到生产环境
## 代码打包
```
npm run build
```
生成dist目录，线上环境所需要的所有资源都在dist目录下。

## 简单配置一个服务器 prod.server.js
```
router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});
```
服务器中的/index.html是指dist目录下的。

