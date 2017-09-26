# Object原型方法
* 属性操作:
> 1. Object.defineProperty();
```js
Object.defineProperty(objectName, objectAttri, {
	configurable: true,
	enumerable: true,
	wirtable: true,
	value: "Alma"
});
Object.defineProperty(objectName, objectAttri, {
	configurable: true,
	enumerable: true,
	get: function(){},
	set: function(newValue){}
});
```
> 2. Object.defineProperties();
```js
Object.defineProperties(objetName, {
	attr1: {
		configurable: true,
		enumerable: true,
		wirtable: true,
		value: "Alma"
	},

	attr2: {
		configurable: true,
		enumerable: true,
		get: function(){},
		set: function(newValue){}
	}
});
```
Object.getOwnPropertyDescriptor();
Object.create(); // 指定原型去创建对象
Object.keys(); // 返回所有可枚举的**实例属性**
Object.getOwnPropertyNames(); // 返回所有**实例属性**, 无论可枚举或者不可枚举
* 原型:
Object.getPrototypeOf();


# 实例方法
instanceOf
typeOf
in
xxx.prototype.isPrototypeOf();
xxx.hasOwnProperty();
xxx.propertyIsEnumerable();
xxx.toLocaleString();
xxx.toString();
xxx.valueOf();


