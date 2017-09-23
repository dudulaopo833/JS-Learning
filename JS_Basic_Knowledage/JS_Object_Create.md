# 共有九种方式来创建对象
* 1. Object构造函数模式
* 2. 对象字面量模式(键值对)
> 提示： 使用Object构造函数模式和对象字面量模式，**缺点**是使用同一接口创建很多对象(很多都是全局对象)，会产生大量的重复代码; 所以才有了工厂模式
* 3. 工厂模式
> 提示： 使用工厂模式，**缺点**是不能识别对象类型(不知道构造函数是谁); 所以才有了构造函数模式
* 4. 构造函数模式(用this)
> 提示： 使用构造函数模式，**缺点**是每实例一次，构造函数里面的方法都创建一遍，由于方法也是对象(等价于new Function)，所以不同实例的同一个方法是不相等的(person1.sayname === person2.sayname)是false; 即使可以把方法移出构造函数外，在构造函数内用指针指向移出的方法，可以解决上面这个问题，但是产生了很多全局方法的问题，而这些全局方法其实只是想给某个对象用; 所以才有了原型模式
* 5. 原型模式
> 提示： 使用原型模式，**缺点**是如果原型有引用类型的属性, 由于被所有实例共享而很容易被某个实例改写而影响所有实例; 所以才有了组合构造函数和原型模式
* 6. 组合构造函数和原型模式(**目前自定义类型最常用的模式**)
> 提示： 每个实例私有的属性放在构造函数里面， 共有的方法和属性放原型里面
* 7. 动态原型模式
> 提示： **了解即可-少用** - 在构造函数中用if去判断原型的**任何**一个该有的方法或者属性有没有，没有才添加到原型中
* 8. 寄生构造函数模式
> 提示： **了解即可-少用** - 类似工厂模式, 但是用new操作符和构造函数; 跟构造函数模式又不一样，因为返回了自定义对象而覆盖了new操作符自带的对象(所以不能用instanceOf来判断类型)
* 9. 稳妥构造函数模式
> 提示： **了解即可-少用** - 不用this和new操作符; 返回了自定义对象, 所以不能用instanceOf来判断类型; 优点是私有变量只能用返回对象的暴露的方法来访问(因为没有用this的原因)

# 每种模式详解
### 1. Object构造函数模式
```js
var person = new Object();
person.name = "Alma";
person.sayName = function() {
	alert(this.name);
}
```
### 2. 对象字面量模式(键值对)
```js
var person = {
	name: "Alma",
	sayName: function(){
		alert(this.name);
	}
}
```
### 3. 工厂模式
```js
function createPerson(name){
	var o = new Object();
	o.name = name;
	o.sayName = function() {
		alert(this.name);
	}
	return o;
}
```
### 4. 构造函数模式(this)
```js
function Person(name) {
	this.name = name;
	this.sayName = function(){
		alert(this.name);
	}
}
```
* 用new操作符实例构造函数的过程如下(类似把构造函数当普通函数用，并且用call绑定作用域到一个创建的对象上)
> a. 创建一个对象		
> b. 帮this绑定到新创建的对象		
> c. 执行构造函数里面的代码		
> d. 返回创建新对象
* 构造函数实质也是函数，可以不用new操作符, 当普通函数用; 那么执行构造函数的代码就是在全局作用域window上绑定了属性和方法
* 构造函数当普通函数用，且用call或者apply绑定作用域到一个新创建的对象; 这个过程和实例化一个构造函数过程类似
```js
var o = new Object();
Person.call(o, "Alma");
o.sayName(); // Alma
```
* 每个实例都可以访问constructor属性, 这个属性其实是原型上的constructor属性; 所以实例和构造函数其实没啥联系, 是通过原型产生了联系, 具体详见[原型祥解](https://github.com/dudulaopo833/JS-Projects/blob/master/JS_Basic_Knowledage/JS_prototype.md)
```js
person1.constructor === Person; // true
person1.constructor === person2.constructor; // true, 都是指向Person
```
* 可以用instanceOf操作符来对象识别, 检测实例是不是某个构造方法的实例
```js
person1 instanceOf Object; // true
person1 instanceOf Person; // true
```
### 5. 原型模式
```js
function Person(){};
Person.prototype.name = "Alma";
Person.prototype.sayName = function(){
	alert(this.name);
}
```
* 关于原型可以祥见[原型祥解](https://github.com/dudulaopo833/JS-Projects/blob/master/JS_Basic_Knowledage/JS_prototype.md)
### 6. 组合构造函数和原型模式(**目前自定义类型最常用的模式**)
> 提示： 每个实例私有的属性放在构造函数里面， 共有的方法和属性放原型里面
```js
function Person(name){
	this.name = name;
}
Person.prototype = {
	constructor: Person,
	sayName : function(){
		alert(this.name);
	}
}
```
### 7. 动态原型模式
> 提示： **了解即可-少用** - 在构造函数中用if去判断原型的**任何**一个该有的方法或者属性有没有，没有才添加到原型中
```js
function Person(name){
	this.name = name;
	if(typeOf this.sayName != "function"){
		Person.prototype.sayName = function(){
			alert(this.name);
		}
	}
}
```
### 8. 寄生构造函数模式(经常是想扩展原生类型方法而又不覆盖原生类型而采取的一种方式)
> 提示： **了解即可-少用** - 类似工厂模式, 但是用new操作符和构造函数; 跟构造函数模式又不一样，因为返回了自定义对象而覆盖了new操作符自带的对象(所以不能用instanceOf来判断类型)
```js
function Person(name){
	var o = new Object();
	o.name = name;
	o.sayName = function(){
		alert(this.name);
	}
	return o;
}
var person1 = new Person("Alma");
```
* 经常是想扩展原生类型方法而又不覆盖原生类型而采取的一种方式
```js
function SpecialArray(){
	var specialArray = new Array();
	specialArray.push.apply(specialArray, arguments);
	specialArray.toPipedString = function(){
		return this.join("|");
	};
	return specialArray;
}
```js
### 9. 稳妥构造函数模式
> 提示： **了解即可-少用** - 不用this和new操作符; 返回了自定义对象, 所以不能用instanceOf来判断类型; 优点是私有变量只能用返回对象的暴露的方法来访问(因为没有用this的原因)
```js
function Person(name){
	var o = new Object();
	var slefName = name;
	o.sayName = function(){
		alert(slefName);
	}
	return o;
}
var person1 = Person("Alma");
person1.sayName(); // Alma
```
