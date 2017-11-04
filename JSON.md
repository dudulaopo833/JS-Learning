JSON: Javascript Object Notation - JS对象表示法, 一种轻量级数据格式

# 语法
--------------------------------------------------------
* 简单值: 可以在JSON中用字符串, 数值, 布尔值, 和null; 但是不支持 undefined; 而且JSON字符串必须使用双引号
* 对象: JSON中的属性需要加双引号
* 数组
> JSON不支持变量, 函数, 或者对象实例; 它就是一种表示结构化数据的格式
```js
// JS 表示对象
var person = {
    name: 'Alma', // 可以单引号
    age: 28
};

// JSON表示对象
{
    "name": "Alma", // 属性需要双引号, 字符串必须双引号
    "age": 28
}
```

# 序列化JSON和解析JSON
--------------------------------------------------------
* 早期用JS中的eval()函数来解析JSON, 但是存在风险, 因为可能会执行一些恶意代码
* ES5封装了JSON对象, 这个对象有stringify()序列化方法和parse()解析方法

### 序列化JSON-JSON.stringify()
* 序列化JSON原则
> 1. 在序列化JS对象时, 所有函数及原型成员都会被忽略
> 2. 值为undefined的任何属性都会被跳过

* 序列化函数的参数
> 1. 第一个参数是过滤器, 可以是一个数组, 也可以是一个函数(函数有参数key, value)
> 2. 第二个参数是表示是否在JSON字符串中保留缩进
```js
var book = {
    title: "Professional Javascript",
    authors: ["Nicholas C. Zakas"],
    edition: 3,
    year: 2011
};

// 数组过滤器
var jsonText = JSON.stringify(book, ["title", "edition"]); // {"title":"Professional Javascript","edition":3}

// 函数过滤器
var jsonText2 = JSON.stringify(book, function(key, value){
    switch(key) {
        case "authors":
            return value.join(",");
        case "year":
            return 5000;
        case "edition":
            return undefined;
        default:
            return value;
    }
}); // {"title":"Professional Javascript","authors":"Nicholas C. Zakas","year":5000}

// 空格字符串缩进
var jsonText3 = JSON.stringify(book, null, 4);
/*
{
    "title": "Professional Javascript",
    "authors": ["Nicholas C. Zakas"],
    "edition": 3,
    "year": 2011
};
*/

// 其他字符串缩进
var jsonText3 = JSON.stringify(book, null, "--");
/*
{
--"title": "Professional Javascript",
--"authors": ["Nicholas C. Zakas"],
--"edition": 3,
--"year": 2011
};
*/
```

* toJSON()方法: 就是对象本身有toJSON方法, 用于返回其自身的JSON数据格式

* 序列化内部顺序
> 1. 如果存在toJSON()方法, 而且能通过它取得有效值, 则调用该方法
> 2. 如果有过滤函数, 那么基于1结果传入这个过滤函数
> 3. 对2过滤出来的结果进行相应的序列化
> 4. 如果有第二个参数, 执行相应的格式化

### 解析JSON-JSON.parse()
* 这个函数也可以接受一个参数, 是函数(函数有参数key, value)
```js
var book = {
    title: "Professional Javascript",
    authors: ["Nicholas C. Zakas"],
    edition: 3,
    year: 2011,
    releaseDate: new Date(2011, 11, 1)
};

var jsonText = JSON.stringify(book); //{"title":"Professional Javascript","authors":["Nicholas C. Zakas"],"edition":3,"year":2011,"releaseDate":"2011-11-30T16:00:00.000Z"}

var bookCopy = JSON.parse(jsonText, function(key, value){
    if (key === "releaseDate"){
        return new Date(value);
    }else {
        return value;
    }
});

alert(bookCopy.releaseDate.getFullYear()); // 2011
```




