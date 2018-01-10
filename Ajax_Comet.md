* Ajax 是无需刷新页面就能够从服务器取得数据的一种方法, 其核心是XMLHttpRequest对象
* Comet 是Ajax的进一步扩展, 让服务器几乎能够实时地向客户端推送数据

# Ajax
-------------------------------------------
* XHR为向服务器发送请求和解析服务器响应提供了流畅的接口
* 单页应用一般都是通过XHR对象获取新数据, 然后通过**DOM**将新数据插入到页面中
* Ajax通信与数据格式无关, 所以XHR可以获取XML数据和其他数据, 比如JSON数据
* 同源策略是XHR的一个主要约束, 它为通信设置了"相同域, 相同端口, 相同协议"的限制

# 1. XMLHttpRequest对象
-------------------------------------------
* new创建这个对象, var xhr = new XMLHttpRequest();
* open()创建连接, xhr.open(method, relative url, true); method有GET和POST; url最好用相对url和跨源资源共享CORS区分开来; true是异步发送, false是同步发送
* setRequestHeader()设置自定义头部信息
* send()发送请求, xhr.send(null);
* readystate属性判断请求阶段, readystate属性变一次就触发readystatechange事件, 在这个事件中用xhr的属性来处理响应
> 1. 0: 未初始化 - new了xhr对象, 但尚未调用open()方法
> 2. 1: 启动 - 调用了open()方法, 但尚未调用send()方法
> 3. 2: 发送 - 调用了send()方法, 尚未接到响应
> 4. 3: 接受 - 已经接收到部分响应
> 5. 4: 完成 - 已经接收到全部响应数据, 且可以在客户端使用了
* 请求回来了之后的处理; 响应的数据自动填充到XHR对象的下列属性中
> 1. responseText: 作为响应主体被返回的文本
> 2. responseXML: 如果响应的内容类型为"text/xml"或者"application/xml", 这个属性中将保存包含着响应数据的XML DOM文档
> 3. status: 响应的HTTP状态. 200表示成功; 304表示请求的资源并没有修改, 可以直接使用浏览器缓存的版本(协商缓存)
> 4. statusText: HTTP状态说明, 因为浏览器兼容原因, 这个属性没有status好用
* abort()用来在得到响应之前取消异步操作
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readystate == 4){
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            var rh = xhr.getAllResponseHeader(); 
            alert(xhr.responseText);
        } else {
            alert("Request was unsuccessful: " + xhr.status);
        }
    }
};
xhr.open("GET", "example.txt", true);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);
```

### 发送请求 - HTTP头部信息
* 请求头部一般包含下列头部信息
> 1. Accept: 浏览器能处理的内容类型
> 2. Accept-Charset: 浏览器能显示的字符集
> 3. Accept-Encoding: 浏览器能处理的压缩编码
> 4. Accept-Language: 浏览器当前设置的语言
> 5. Connection: 浏览器与服务器之间连接的类型
> 6. Cookie: 当前页面设置的任何Cookie
> 7. Host: 发出请求的页面所在的域
> 8. Referer: 发出请求的页面的URI
> 9. User-Agent: 浏览器的用户代理字符串
* XHR提供了setRequestHeader()方法来设置自定义的请求头部信息, 必须在open()和send()方法之间
* XHR提供了getResponseHader()方法来获取某个响应头部信息; 提供了getAllResponseHeader()方法来获取所有响应头部信息
* 服务器可以利用头部信息向浏览器发送额外的、结构化的数据

### 发送请求 - GET请求
* 传入open()方法的URI末尾的查询字符串必须经过正确的编码才行(用encodeURIComponent()方法进行编码)
* 查询字符串所有名值对都必须有&分隔
```js
xhr.open("GET", "example.php?name1=value1&name2=value2", ture);
```
* 下面这个函数可以辅助现有URL的末尾添加查询字符串参数
```js
function addURLParam(url, name, value){
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}
```

### 发送请求 - POST请求
* 可以用XHR来模仿表单提交
> 1. 设置Content-Type请求头部信息为application/x-www-form-urlencoded
> 2. 序列化要发送的数据
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){};
xhr.open("POST", "postxample.php", ture);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var form = document.getElementById("user-form");
xhr.send(serialize(form));
```

# 2. XMLHttpRequest 2
-------------------------------------------
### FormData类型
* FormData为序列化表单以及创建与表单格式相同的数据(用于通过XHR传输)提供了便利, 可以直接添加一些名-值对
```js
var data = new FormData();
data.append("name", "Alma");

var data2 = new FormData(document.forms[0]);
```
* XHR对象能够识别传入的数据类型为FormData的实例, 配置适当的头部信息; 所以不必明确地在XHR对象上设置请求头部
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){};
xhr.open("POST", "postxample.php", ture);
var form = document.getElementById("user-form");
xhr.send(new FormData(form));
```

### overrideMimeType()方法
* 必须在send()方法之前调用overrideMimeType()方法才能保证重写响应的MIME类型
```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "text.php", true);
xhr.overrideMimeType("text/xml");
xhr.send(null);
```

### 进度事件
* 有6种进度事件, 就是从刚开始接收到数据算起的事件
> 1. loadstart: 在接受到响应数据的第一个字节时触发
> 2. progress: 在接收响应期间持续不断地触发
> 3. error: 在请求发生错误时触发
> 4. abort: 在因为调用abort()方法而终止连接时触发
> 5. load: 在接收到完整响应数据时触发; 这个事件类似readystatechange事件
> 6. loadend: 在通信完成或者触发error, abort, load事件后触发
* onprogress事件会接收一个event对象, event.target为XHR对象; event.lengthComputable表示进度信息是否可用的布尔值; event.position表示已经接收的字节数; event.totalSize表示根据Content-Length响应头部确定的预期字节数; 在调用open()之前调用
```js
var xhr = new XMLHttpRequest();
xhr.onload = function(event){
    if(xhr.readystate == 4){
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            var rh = xhr.getAllResponseHeader(); 
            alert(xhr.responseText);
        } else {
            alert("Request was unsuccessful: " + xhr.status);
        }
    }
};
xhr.onprogress = function(event){
    var divStatus = document.getElementById("status");
    if (event.lengthComputable) {
        divStatus.innerHTML = "Received " + event.position + " of " + event.totalSize + " bytes"; // 可以算百分比
    }
};
xhr.open("GET", "example.txt", true);
xhr.send(null);
```

# 3. 跨源资源共享
-------------------------------------------

# 4. 其他跨域技术