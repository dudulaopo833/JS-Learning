* Javascript 最初的一个作用， 就是分担服务器处理表单的责任， 打破处处依赖服务器的局面

# 表单基础知识
-------------------------------------------------------------
### 与其他HTML元素有相同默认属性, 也有HTMLFormElement独有的特性
* 属性:  id, target, name, method(get/post), elements, length, acceptCharset(accept-charset in html), action, enctype, 
* 方法: reset(), submit()
### 选取表单
* 添加id特性, 然后document.getElementById("form1");
* doucment.forms[i];
### 提交表单
* <input>/<button>中type属性为submit, 或者<input>中type为image;
> 在有提交按钮的相应表单空间拥有焦点情况下, 回车键就可以提交表单
* JS中submit方法来提交表单
> 用submit()方法提交表单时候, 不**会触发submit事件**
```js
var form = document.getElementById("myForm");
form.submit();
```
> 提交表单有一个问题就是重复提交表单: 一提交之后禁用提交按钮(disabled), 二利用onsubmit事件处理程序取消后续的表单提交操作
### 重置表单
* <input>/<button>中type属性为reset
* JS中reset()方法重置表单, 会触发reset事件
### 表单字段
* 共有表单字段属性: type, value, readOnly, disabled, autoFocus, form(只读), name, tabIndex,
> type: <select>对应 select-one, <select multiple>对应 select-multiple, <button>对应submit, <button type="button">对应button, <button type="reset">对应reset, <button type="sumit">对应submit
* 共有表单字段方法: focus(), blur()
* 共有表单字段事件: blur, change, focus, submit, reset

# 文本框脚本<input type="text">/<textarea>
------------------------------------------------------------
* 单行文本框input: size, value, maxLength
```html
<input type="text" size="25" maxlength="50 value="initial value">
```
* 多行文本框texttarea, cols和rows属性
### 1. 选择文本
* 选择所有文本: JS事件是select(); 事件则是select事件
* 取得选择的文本: 可以用html扩展的属性selectionStart和selectionEnd; IE8之前就用document.selection对象
```js
function getSelectedText(textbox) {
    if ( typeof textbox.selectionStart == "number") {
        return textbox.value.substring(textbox.selectionStart, textbox,selectionEnd);
    } else if (document.selection) { // IE8
        return document.selection.createRange().text;
    }
}
```
* 选择部分文本: html5提供了setSelectionRange(); 如果要看到选择的部分文本, 要在调用setSelectionRange()方法之前后者之后需要焦点设置到文本框

### 2. 过滤输入
* 屏蔽字符: 通过正则检测到不符合输入规范, 就阻止默认事件
```js
EventUtil.addHandler(textbox, "keypress", function(event){
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);

    if( !/\d/.test(String.fromCharCode(charCode))){ //不符合输入规范
        EventUtil.preventDefault(event); // 阻止默认事件
    }
})
```
* 操作剪贴板: 剪贴板有beforecopy, copy, beforecut, cut, beforepaste, paste六个事件; 要访问剪贴板数据可以用clipboardData对象(在IE中是window属性, 在其他浏览器就是event对象属性); clipboardData对象有getData(), setData(), clearData()三个方法

### 3. 自动切换焦点, 增加易用性
```js
function tabForward(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if (target.value.length == target.maxLength) { // 如果输入已经达到最后一位、
        var form = target.form;
        if (var i = 0, len = form.elements.length; i < len; i ++){ // 循坏form所有的元素
            if(form.elements[i] == target) { // 找到当前元素
                if(form.elements[i+1]){ // 如果还有下一个元素就下一个元素就聚焦
                    form.elements[i+1].focus();
                }
                return;
            }
        }

    }
}
```
### 4. HTML5约束验证的API
* 必填字段: required属性
* 其他输入类型: type="email", type="url", type="radio", type="checkbox", type="password", type="hidden", type="image", type="file"
* 数值范围: 
> 1. type="number", type="range", type="datetime", type="datetime-local", type="date", type="month", type="week"
> 2. min="1", max="100", step="5"
* 输入模式: pattern="\d+"
* 检测有效性： 表单元素或者表单用checkValidity()方法; 也可以用validity属性, 这个属性对象包含一系列属性来说明检测结果
> customError(setCustomValidity()), patternMismatch, rangeOverflow, stepMisMatch, tooLong, typeMismatch, valid, valueMissing
* 禁用验证: 表单有novalidate属性, 或者提交按钮上formnovalidate属性
```html
<form method="post" action="singup.php" novalidate></form>
<input type="submit" formnovalidate name="btnNoValidate">
```

# 选择框脚本: <select>和<option>
-----------------------------------------
* 除了所有表单字段共有属性和方法外, HTMLSelectElement(<select>)类型还有下面这些属性和方法
> 1. 属性: multiple, options, selectedIndex, size, type(select-one, select-multiple), value
> 2. 方法: add(newOption, relOption), remove(index)
* HTMLOptionElement(<option>)类型有下面属性
> 属性: index, label, selected, text, value
```js
// 推荐用属性来取值
var text = selectbox.options[0].text;
var value = selectbox.options[0].value;
//  不推荐用DOM方法来取值
var text = selectbox.options[0].firstChild.nodeValue;
var value = selectbox.options[0].getAttribute("value");
```
* 其他表单字段的change事件是需要焦点离开才触发, 而选择框select的change事件是选中了选项就会触发

#### 1. 选择选项
* 单选框: 用selectedIndex属性来取. e.g. selectbox.options[selectbox.selectedIndex];
* 多选框: 用selected属性来取, 可以取多个选择
```js
function getSelectedOptions(selectbox) {
    var result = [];
    var option = null;

    for(var i = 0, len = selectbox.options.length; i < len; i ++){
        option = selectbox.options[i];
        if (option.selected) {
            result.push(option);
        }
    }
    return result;
}
```

### 2. 添加选项
> 1. JS动态创建选项, 并将它添加到选择框中
> 2. 使用Option构造函数来创建新选项
> 3. 用选择框的add()方法
```js
// 第一种方法
var newOption = document.createElement("option");
newOption.appendChild(document.createTextNode("Option text"));
newOption.setAttribute("value", "Option value");
selectbox.appendChild(newOption);

// 第二种方法
var newOption = new Option("Option text", "Option value");
selectbox.appendChild(newOption);

// 第三种方法
var newOption = new Option("Option text", "Option value");
selectbox.add(newOption, undefined); // undefined表示加在最后面
```

### 3. 移除选项
> 1. 使用DOM的 removeChild()方法
> 2. 使用选择框的remove()方法
> 3. 将相应选项设置为null
```js
selectbox.removeChild(selectbox.options[0]);
selectbox.remove(0);
selectbox.options[0] = null;
```

### 4. 移动和重排选项
> 1. appendChild()
> 2. insertBefore()

# 富文本编辑(所见即所得)
------------------------------------------
* 方法一: 页面中嵌入了一个HTML页面的iframe, 通过设置iframe designMode属性, 就可以变成可编辑, 编辑对象就是<body>元素
* 方法二：用contenteditable（true, false, inherit）属性来修饰div

### 1. 操作富文本
> 1. document.execCommand(): document.execCommand("blod", false, null) 或者frames["richedit"].document.excecCommand("blod", false, null)
> 2. document.queryCommandEnabled("blod“)
> 3. document.queryCommandValue("fontsize")

### 2. 富文本选区: 表单元素getSelection()