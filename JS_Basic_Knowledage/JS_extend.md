# 继承
### 继承的6中实现方式
* 利用原型链实现继承: 重写原型为某个类型的实例, 通过搜索机制, 从而继承了某个类型的属性和方法
> 1. 原型链继承的实质是 ：丢弃默认原型, **重写原型为另外一个类型的实例**, 利用搜索机制从而找到实例的原型方法 
> 2. 需要在改写了原型为超类实例之后， 再添加自己的原型方法, 避免改写原型之后, 方法被断掉了
> 3. 提示： 使用原型链实现继, **缺点**有一如果原型有引用类型, 所有实例都可以操控这个引用类型; 有二在子类型实例时, 不能向超类型的构造函数传递参数; 所以很少单独用原型链, 就有了借用构造函数的方式实现继承   
* 借用构造函数实现继承 : 思想是在子类型的构造函数内部用超类型的构造函数(当普通函数用call, apply来调用)
> 1. 解决了共享引用属性的问题, 也解决了向超类型传递参数问题     
> 2. 需要在调用了超类型构造函数后， 再添加自己的属性, 避免被超类型同名属性覆盖
> 3. 提示： 使用借用构造函数实现继承, **缺点**有需要继承的方法都必须写在构造函数里面，就没有办法复用了(所有实例的同名方法其实是不同的对象); 所以才有了下面的组合原型链和借用构造函数继承
* 组合原型链和借用构造函数实现继承(**最常用的继承方式**)
> 1. 思想：使用原型链实现对原型继承, 使用构造函数实现实例属性继承
> 2. **缺点**： 调用了两次超类型构造函数！ 第一次重写原型时, 实例执行了构造函数且原型有超类属性; 第二次在实例时候执行子类构造函数, call/apply 了超类构造函数生成了实例属性, 因为同名所以屏蔽调了原型的属性(原型的同属属性是多余的). 所以才有了寄生组合式继承
* 原型式继承 : Object.create()就是原型式继承
> 1. 先内部创建临时性构造函数， 然后将传入的参数作为这个构造函数的原型, 最终返回这个构造函数的实例; 那个这个实例就有了原型的方法; 但是这种方式也是有原型链继承的引用属性共享的问题
> 2. Object.create()就是实现了上述的步骤, 返回了一个实例, 这个实例的原型是传入的第一个参数; 传入的第二个参数就是新的属性, 写法和 Object.defineProperties一样
```js
var person = {
  name: "Alma",
  age: 18
};
var anotherPerson = Object.create(person, {
  name: {
    value: "Ma", // 这个会覆盖超类的同名属性
    configurable: true
  },
  friends: ["Alma", "Jack"]
});
alert(anotherPerson.name); // Ma
```
* 寄生式继承（用了原型式继承的方法）
> a. 寄生式继承和用工厂模式或者寄生构造函数模式去创建对象是类似的道理, 就是创建一个函数仅仅用于封装继承的过程, 该函数在内部以某种方式增强对象
> b. 但不是用new来调用, 是直接调用；这个和寄生构造函数模式去创建对象又不一样
* 寄生组合式继承(用了寄生式继承的思路)
> 1. 实质这个方式继承有几种模式一起组成, 首先是使用寄生式继承来封装了一个函数, 函数接受两个参数, 一个是超类, 一个是子类； 在函数里面创建了一个对象，继承了超类的原型（用了原型式继承的方法）; 然后这个原型的构造函数指向子类(就是在增强对象); 最后子类的原型指向这个对象
> 2. 因为定义的这个函数可以替换组合原型链和借用构造函数的继承中的子类原型是超类实例这个方式, 那么就不需要调用两次超类的构造函数, 原型也没有同名的多余属性了

### 详细的例子
* 利用原型链实现继承: 重写原型为某个类型的实例, 通过搜索机制, 从而继承了某个类型的属性和方法
```js
function SuperType () {
  this.name = "Alma";
}
SuperType.prototype.getName = function() {
  return this.name;
}

function SubType () {
  this.age = 18;
}
SubType.prototype = new SuperType(); // 继承SuperType, SubType的原型是SuperType的实例, 拥有实例属性name, 有SuperType的原型方法getName
SubType.prototype.getAge = function() { // 在改变原型之后, 再向原型添加方法
  return this.age;
}

var instance = new SubType();
alert(instance.getName()); // Alma
alert(instance.getAge()); // 18
```
* 借用构造函数实现继承, 思想是在子类型的构造函数内部用超类型的构造函数(当普通函数用call, apply来调用)
```js
function SuperType(name) {
  this.colors = ["green","red"];
  this.name = name;
  this.getName = function(){
    return this.name;
  };
};
function SubType(name) {
  SuperType.call(this, name); //可以传递参数, 且继承了SuperType的colors和name 属性, 和getName方法
  this.age = 18; // 在调用了构造函数之后, 再写自己的属性, 避免被父类的同名属性覆盖
};
var instance1 = new SubType("Alma");
instance1.colors.push("Alma");
alert(instance1.colors); // green, red, Alma
var instance2 = new SubType("Ma");
alert(instance2.colors); // green, red
alert(instance2.getName()); // Ma
```
* 组合原型链和借用构造函数实现继承(**最常用的继承方式**)
```js
function SuperType(name) {
  this.colors = ["green","red"];
  this.name = name;
};
SuperType.prototype.getName = function(){
  alert(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name); //可以传递参数, 且继承了SuperType的colors和name 属性
  this.age = age; // 在调用了构造函数之后, 再写自己的属性, 避免被父类的同名属性覆盖
};
SubType.prototype = new SuperType(); // 继承SuperType, SubType的原型是SuperType的实例, 原型上拥有实例属性name, colors, 有SuperType的原型方法getName
SubType.prototype.getAge = function() {
  alert(this.age);
};
var instance1 = new SubType("Alma", 18);
instance1.colors.push("Alma");
alert(instance1.colors); // green, red, Alma
instance1.getName(); // Alma
instance1.getAge(); // 18

var instance2 = new SubType("Ma", 28);
alert(instance2.colors); // green, red
instance2.getName(); // Ma
instance2.getAge(); // 28
```
* 原型式继承: Object.create()就是原型式继承
```js
function object(o){
  function F(){};
  F.prototype = o;
  return new F();
}
```
* 寄生式继承
```js
function createAnother(original){
  var clone = object(original); // object is the above function
  clone.sayHi = function (){
    alert("hi");
  };
  return clone;
}
```
* 寄生组合式继承
```js
function inheritPrototype(subType, superType){
  var clone = object(superType.prototype); //创建对象
  clone.constructor = subType; // 增强对象
  subType.prototype = clone; // 指定对象
}
```
实例中用如下：
```js
function SuperType(name) {
  this.colors = ["green","red"];
  this.name = name;
};
SuperType.prototype.getName = function(){
  alert(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name); //可以传递参数, 且继承了SuperType的colors和name 属性
  this.age = age; // 在调用了构造函数之后, 再写自己的属性, 避免被父类的同名属性覆盖
};
inheritPrototype(SubType, SuperType); // 继承SuperType, SubType的原型是SuperType的原型, 拥有原型方法getName
SubType.prototype.getAge = function() {
  alert(this.age);
};
```
