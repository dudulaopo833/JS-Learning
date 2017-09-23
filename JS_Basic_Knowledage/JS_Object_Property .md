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
### 4. 定义访问器属性，则需要用 Object.defineProperty();
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
