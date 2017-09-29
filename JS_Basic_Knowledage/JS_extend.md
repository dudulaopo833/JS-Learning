# 继承
### 继承的6中实现方式
* 利用原型链实现继承: 重写原型为某个类型的实例, 通过搜索机制, 从而继承了某个类型的属性和方法
> 1. 原型链继承的实质是 ：丢弃默认原型, **重写原型为另外一个类型的实例**, 利用搜索机制从而找到实例的原型方法 
〉2. 需要在改写了原型为超类实例之后， 再添加自己的原型方法, 避免改写原型之后, 方法被断掉了
> 3. 提示： 使用原型链实现继, **缺点**有一如果原型有引用类型, 所有实例都可以操控这个引用类型; 有二在子类型实例时, 不能向超类型的构造函数传递参数; 所以很少单独用原型链, 就有了借用构造函数的方式实现继承   
* 借用构造函数实现继承 : 思想是在子类型的构造函数内部用超类型的构造函数(当普通函数用call, apply来调用)
> 1. 解决了共享引用属性的问题, 也解决了向超类型传递参数问题     
> 2. 需要在调用了超类型构造函数后， 再添加自己的属性, 避免被超类型同名属性覆盖
> 3. 提示： 使用借用构造函数实现继承, **缺点**有需要继承的方法都必须写在构造函数里面，就没有办法复用了; 所以才有了下面的组合原型链和借用构造函数继承
* 组合原型链和借用构造函数实现继承(**最常用的继承方式**)
> 1. 思想：使用原型链实现对原型继承, 使用构造函数实现实例属性继承
> 2. **缺点**： 调用了两次超类型构造函数！ 第一次重写原型时, 实例执行了构造函数且原型有超类属性; 第二次在实例时候执行子类构造函数, call/apply 了超类构造函数生成了实例属性, 因为同名所以屏蔽调了原型的属性.
* 原型式继承
> Object.create()就是原型式继承
* 寄生式继承
* 寄生组合式继承

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
SubType.prototype = new SuperType(); // 继承SuperType, SubType的原型是SuperType的实例, 拥有实例属性name, 有SuperType的实例方法getName
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
> 思想：使用原型链实现对原型继承, 使用构造函数实现实例属性继承
> 缺点： 调用了两次构造函数！ 第一次重写原型时, 实例执行了构造函数且原型有超类属性; 第二次在实例时候执行子类构造函数, call/apply 了超类构造函数生成了实例属性, 因为同名所以屏蔽调了原型的属性.
* 原型式继承
> Object.create()就是原型式继承
* 寄生式继承
* 寄生组合式继承
