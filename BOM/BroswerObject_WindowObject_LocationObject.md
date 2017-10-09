## window.location Object 表示窗口中当前显示的文档的 Web 地址(url)的相关信息
* location既是window属性, 也是document属性; 所以window.location = document.location

* 改变浏览器url的有三种方式
> 1. location.assign('url');
> 2. window.location = 'url';
> 3. location.href = 'url';(最常用)

* location.assign('url')这个方法会立即打开新的URL并创建浏览器的历史记录; window.location = 'url' 和 location.href = 'url' 实际最终都是调用assign这个方法. 如果直接赋值给window.location会在当前打开窗口打开新的显示文档(其实是赋值给location.href属性). 而window.open()是打开新的窗口

* 方法有： reload(), replace()-不会在history上生成记录, assign()
> 1. 如果用改变浏览器url的三种方式, 或者直接改变url中的某个属性(hash, host等), 都会在浏览器中增加一条历史记录; 
> 2. 但是用location.replace就不会新增历史记录
> 3. location.reload(true), true表示不从缓存中重新加载, 而是强制从服务器上加载页面

* 属性中href表示整个url，而其他属性表示url中的各个部分
> href = "http://example.com:1234/test/test.htm#part2"   
> host = "example.com:1234"   
> hostname = "example.com"   
> hash = "#part2"   
> pathname = "/test/test.htm"   
> port = "1234"   
> protocal = "http:"   
> search = "?f=hdom_loc_search"   

* 用location.search可以查询字符串参数, 可以用以下方法可以得到每个查询字段, 需要用到decodeURIComponent();
```js
function getQueryStringArgs() {
    //取得查询字符串, 并且去掉问号
    var queryString = location.search.length > 0 ? location.search.substring(1) : "";
    var args = {}; // 用于保存查询字段对象
    var items = queryString.length ? queryString.split('&') : []; //取得每一项查询字段
    var item = null, name = null, value = null, i, len = items.length;

    for( i = 0; i < len; i ++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]); //因为一般url上的字符串都被编码过, 所以需要解码出来
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }

    return args;
}
```
