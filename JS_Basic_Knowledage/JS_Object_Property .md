# 认识对象 - 对象属性及属性特征值
### 1. 对象属性(person.name)在创建的时候带有一些特征值， 这些特征值就定义了属性的行为
### 2. 属性有数据属性，访问器属性； 
数据属性有configurable, enumerable, writable, value四个特征值； 访问器属性有configurable, enumerable, get(函数), set(函数) 四个特征值
* configurable: 定义了不能delete属性， 不能修改属性特性; 在创建对象时， 属性的configurable默认为true
* enumerable: 表示能否用for in 来循坏返回这个属性; 在创建对象时， 属性的enumerable默认为true
* writable: 表示属性的value特征值能否被修改; 在创建对象时， 属性的writable默认为true
* value: 属性的值; 在创建对象时， 属性的value默认为undefined
### 3. 修改属性的默认特征，则需要用Object.defineProperty()
* 如果把configurable改为了false， 就不可能再改回configurable: true,会报Cannot redefine property: name
* 如果在修改默认特征时候，没有指明某个特性的值， 那么那个特性就默认false
```js
var person = { name: "ma" };
console.log(person.name); // ma
Object.defineProperty(person, "name", {
	configurable: false,
  value: "alma"
});
console.log(person.name); // alma
delete person.name; //因为configurable 是false，所以delete不了属性，也修改不了特征； 严格模式下会报错
console.log(person.name); // alma
Object.defineProperty(person, "name", { // 报错： Cannot redefine property: name
	// configurable: true,
  writable: true
});
```
### 4. 定义访问器属性，则需要用 Object.defineProperty(); 或者用对象字面量来定义
```js
var book = {
  _year: 2004
};
Object.defineProperty(book, "year", {
  get: function(){
    return this._year;
  },
  set: function(newValue){
    this._year = newValue;
  }
});

var man = {
  name: "Alma",
  get age(){
    return 27;
  },
  set age(val){
    this.age = val;
}
console.log(man.age); // 27
man.age = 100;
console.log(man.age); //  100
```
### 5. 同一时间定义多个属性，用Object.defineProperties();
```js
var book = {};
Object.defineProperties(book, {
  _year: { // 数据属性
    writable: true,
    value: 2004
  }
  
  year: { //访问属性
    get: function(){return this._year}，
    set: function(newValue){this._year = newValue}
  }
});
```
### 读取对象属性的特征，用Object.getOwnPropertyDescriptor()， 返回这个属性的描述符(4个特征值)

# 读写对象属性
### 读写属性异常
* 如果某个属性不在对象上， 那么读取的时候，会返回 undefined
* 如果去读取或者写不存在的属性(undefined)的子集, 会报错
* 可以巧用&&运算符来处理这里判断属性读取问题
```js
var obj = {x: 1};
obj.y; // undefined
var yz = obj.y.z; // TypeError: Cannot read property z of undefined
obj.y.z = 2; // TypeError: Cannot set property z of undefined
var yz = obj && obj.y && obj.y.z;
```
### 删除属性
* delete 运算符不是返回删除成不成功， 而是返回有没有这个属性; 如果已经删除的属性, 再次删除, 依然返回true
* 如果属性的特性configurable是false, 那么用delete运算符就返回false, 代表这个属性不可以被删除
```js
var person = { age: 28, name: 'Alma'};
delete person.name; // true
person.name; // undefined
delete person.name; // true

delete Object.prototype; // false;
var descriptor = Object.getOwnPropertyDescriptor(Object, 'prototype');
descriptor.configurable; // false;
```
* 对于var定义的全局变量或者局部变量; 对于function定义的全局函数或者局部函数, 都不可以用delete运算符删除; 但是如果不用var隐形定义的全局变量确可以被删除
```js
var myName = "Alma";
console.log(delete myName); // false
console.log(myName); // Alma
(function(){
	var localName = "Alma";
  console.log(delete localName); // false
  console.log(localName); // Alma
})();

function myFun(){};
console.log(delete myFun); // false
(function (){
 function localFun(){};
 console.log(delete localFun); // false
})();

ohNo = 1;
console.log(window.ohNo); // 1
delete ohNo;
console.log(window.ohNo); // undefined
```
### 检测属性
* 用hasOwnProperty()可以检测是不是自己的属性
* 用in运算符可以检测在原型或者自己上有没有那个属性
* 结合hasOwnProperty()和in运算符，可以判断原型有没有那个属性
```js
function hasPrototypeProperty(object, name){
	return !object.hasOwnProperty(name) && (name in object); // xxx.hasOwnProperty('name')); 
}
```
### 枚举属性
> 1. in运算符会判断某个属性是否在对象中, 无论这个属性是在实例中还是在原型中; 配合for来使用, 返回的是可枚举的属性, 无论可枚举属性在实例中还是在原型中
```js
for (var prop in objectName){
}
```
> 2. Object.keys()返回所有可枚举的**实例属性**
> 3. Object.getOwnPropertyNames()返回所有**实例属性**, 无论可枚举或者不可枚举


