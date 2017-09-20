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
foo(); // 10; 执行的时候，光杆司令，默认绑定到window, 而不是定义的foo对象(函数也是对象)，所以this.a = window.a = 10; 
       //严格模式下, 是undefined
```
### b. 隐性绑定：函数调用的时候，指定了对象，并且这个对象一定要有调用的函数定义，不然会抱错的
```
function getName(){
  console.log(this.name);
};
var exampleObject = {
  name: "Alma",
  getName: getName // 一定需要定义这个getName; 如果没有，会报exampleObject.getName is not a function
};
getName(); // undefined; 执行的时候，光杆司令，默认绑定到window, 所以window.name 是undefined
exampleObject.getName(); // Alma; 执行的时候，有上下文exampleObject, 所以this指向exampleObject, this.name为Alma
```
### c. 显示绑定：用call， apply， bind 来显示改变执行的上下文
* call(context, arg1, arg2, ...) 立即执行
* apply(context, [arg1, arg2, ...]) 立即执行
* bind(context) 不会立即执行，仅仅是把context绑定到函数中的this, 然后返回绑定了上下文的函数; 返回的这个函数如果赋值给某个变量，那么这个变量不能再改变上下文
```
function getName(){
  console.log(this.name);
};
var exampleObject = {
  name: "Alma"
};
var exmapleObject_Two = {
  name: "Ma"
};
getName.call(exmapleObject_Two); // Ma; 执行的时候，已经有了绑定的上下文exampleObject_Two, 所以this指向exmapleObject_Two, this.name 为Ma
var aaa = getName.bind(exampleObject); // 不会立即执行，但是会绑定this到exampleObject
aaa(); // Alma; 执行的时候，已经有了绑定的上下文exampleObject, 所以this指向exampleObject, this.name为Alma
getName.call(exmapleObject_Two); // Ma
aaa.call(exmapleObject_Two); // Alma ; 因为刚才已经用bind绑定了上下文，所以即使再用bind,call,apply也改变不了之前的绑定
```

