# 路由
* 路由就是url和处理函数的映射
* route就是一条路由, 而router就是一个机制去管理多个route; 就是接受到一个url, 去路由映射表里找处理函数

### 服务端路由: router在匹配route过程, 除了url, 还有请求的方法post/get来匹配的
> 1. 静态资源服务器, url的映射函数就是文件读取操作
> 2. 动态资源服务器, url的映射函数就是数据库读取操作

### 客户端路由: 路由的映射函数都是处理一些DOM的显示和隐藏操作, 当访问不同url时, 会显示不同的组件
> 1. 基于hash来实现: 发送给服务器的请求url不会包含hash的, [例子参考这里](https://github.com/dudulaopo833/JS-Projects/tree/master/Route_Hash)
> 2. 基于history API来实现: 只改变url, 并不会真的请求, [例子参考这里](https://github.com/dudulaopo833/JS-Projects/tree/master/Route_History API_Ajax)

* 客户端路由的两种方式的比较
> 1. hash路由兼容性更好, history API路由更加直观和正式
> 2. hash路由不需要改动服务器, history API路由需要改动服务器
```js
// 假设服务器有两个文件 index.html 和 script.js; 并且index.html 引用了script.js

// 基于hash的路由有
http://exmaple.com/
http://example.com/#/foobar
// 基于history API的路由有
http://exmaple.com/
http://example.com/foobar

// Step 1: 直接访问http://example.com/ 两种路由行为一致, 返回了index.html
// Step 2： 从 http://example.com/ 跳到 http://example.com/#/foobar 或者 http://example.com/foobar; 因为已经加载了script.js, 所以都能正确处理路由

// 差异: 直接访问 http://example.com/#/foobar 因为hash不会发送给服务器, 所以实际请求 http://example.com, 所以可以正确处理

// 差异： 直接访问 http://example.com/foobar 就真的实际请求这个路径, 但是服务器其实没有这个路径的, 会返回404错误

// 差异的解决方法: 改造服务端, 使得接受到 http://example.com/foobar 能请求到index.html
```

### 动态路由: restful API中经常有 “/urser/:id" 这种动态路由
### 严格路由: /foobar(类比一个文件) 和 /foobar/(类比一个目录) 是不一样的, 需要看服务器怎么处理

### pjax
pjax是一种基于ajax+history.pushState的新技术，该技术可以无刷新改变页面的内容，并且可以改变页面的URL。pjax是ajax+pushState的封装，同时支持本地存储、动画等多种功能。目前支持jquery、qwrap、kissy等多种版本

### 其他知识点
Google还规定，如果你希望Ajax生成的内容被浏览引擎读取，那么URL中可以使用"#!"，Google会自动将其后面的内容转成查询字符串_escaped_fragment_的值。
> 1. 比如，Google发现新版twitter的URL如：http://twitter.com/#!/username
> 2. 就会自动抓取另一个URL：http://twitter.com/?_escaped_fragment_=/username