# 1. JS中的this的指向不在于是谁定义；在于在哪里由谁调用
# 2. JS的this在ES5有四种绑定规则，且优先级顺序如下；在ES6中的箭头函数是第五种规则
ES5四种绑定规则：new 绑定 〉显示绑定 〉隐性绑定 〉默认绑定
### a. 默认绑定：如果在函数调用的时候，是光杆司令，没有绑定任何上下文，那么就默认绑定在window上; 如果注意严格模式下，是undefined
```
// 例子1
var exampleObject = {
  name: "Alma",
  getName: function(){
    console.log(this.name);
  }
}
var aaa = exampleObject.getName; //这是一个赋值操作
aaa(); // undefined; 执行的时候，光杆司令，默认绑定到window, 所以window.name 是undefined
// 例子2
function foo(){
  var a = 1;
  console.log(this.a);
}
var a = 10;
foo(); // 10; 执行的时候，光杆司令，默认绑定到window, 而不是定义的foo对象(函数也是对象)，所以this.a = window.a = 10; 严格模式下, 是undefined
```
### b. 隐性绑定：函数调用的时候，指定了对象，并且这个对象一定要有调用的函数，不然会抱错的
```
```

