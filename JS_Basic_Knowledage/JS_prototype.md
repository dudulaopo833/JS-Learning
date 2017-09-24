# 1. 理解原型
### 构造函数, 原型, 实例三者关系
* 构造函数和原型的关系： 
> 1. 每个构造函数(其实每个函数)在创建的时候, 就已经有一个默认的原型对象; 这个原型对象有一个construtor属性指向构造函数, 而构造函数有一个prototype属性指向这个默认原型
> 2. 原型最初只有construtor属性, 当向原型添加方法或者属性的时候，原型才有其他属性和方法
```js
Person.prototype.constructor === Person; // true
```
* 原型与实例的关系：
> 1. 每个实例都有一个_proto_属性指向原型对象
> 2. 每个实例用new创建的过程如下(类似把构造函数当普通函数用，并且用call绑定作用域到一个创建的对象上)
	> a. 创建一个对象		
	> b. 帮this绑定到新创建的对象		
	> c. 执行构造函数里面的代码		
	> d. 返回创建新对象
```js
// 类似于构造函数当普通函数用，且用call或者apply绑定作用域到一个新创建的对象; 
var o = new Object();
Person.call(o, "Alma");
o.sayName(); // Alma
```
* 构造函数与实例的关系：
> 1. 构造函数与实例没有什么关系, 而是通过原型产生了联系
> 2. 每个实例都可以通过访问constructor属性来找到构造函数, 而constructor属性其实通过搜索机制找到的原型上的constructor属性;
* 判断三者关系
> 1. 构造函数与实例关系: 用instanceOf运算符; 
```js
person1 instanceOf Person; //true
```
> 2. 原型与实例关系: 用isPrototypeOf()方法或者Object.getPrototypeOf()方法
```js
Person.prototype.isPrototypeOf(person1); // true
Object.getPrototypeOf(person1) === Person.prototype; //true
```
### 原型与in运算符
> 1. in运算符会判断某个属性是否在对象中, 无论这个属性是在实例中还是在原型中
> 2. 配合for来使用, 返回的是可枚举的属性, 无论可枚举属性在实例中还是在原型中; 如果原型
```js
for (var prop in objectName){
}
```
> 3. 一起使用hasOwnProperty()和in运算符, 就可以确定某个属性是在实例中还是原型中
```js
function hasPrototypeProperty(object, name){
	return !object.hasOwnProperty(name) && (name in object);
}
```
### 原型的动态性
a. 可以先实例化, 然后扩展原型方法; 那么先实例的那个对象也可以访问得到原型新添加的方法; 这个得益于_proto_指针指向原型和搜索机制
b. 如果重写原型, 那么先实例的对象的原型还是指向以前的默认原型, 但是构造函数的prototype指向了重写的原型; 那么先实例的对象和重写的原型是没有联系的, 而构造函数, 原型, 实例因为原型改写而不会产生联系

### 搜索机制
* 访问实例属性的时候, 首先会在实例中搜索该属性, 找到而返回; 找不到搜索实例原型, 找到则返回; 找不到则再向原型的原型查找, 直到找到或者搜索到了原型链的末端
> 如果实例与原型有同名的属性, 根据搜索机制, 找到了实例的该属性就返回, 所以原型的该属性就被屏蔽或者说覆盖了
> 如果用delete运算符删除掉实例的该属性, 根据搜索机制, 返回的是原型的该属性

# 继承
### 下图是通过原型来实现继承的结构图(继承的实质丢弃默认原型, **重写原型为另外一个类型的实例**, 利用搜索机制从而找到实例的原型方法)
![prototype_link](https://github.com/dudulaopo833/JS-Projects/tree/master/JS_Basic_Knowledage/JS_Prototype_Link.jpg)
> 1. 每个构造函数都有一个prototype属性指向原型, 原型都有一个constructor属性指向构造函数, 每个实例都有一个_proto_属性指向原型
> 2. 所有函数的原型都是Object的实例, 所以每个原型都有_proto_属性指向Object原型; Object原型的原型是null
> 3. 每个构造函数都有_proto_属性指向Function.prototype
> 4. Function构造函数的_proto_属性指向了Function.prototype, Function的原型也是Object.prototype

