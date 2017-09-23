* 原型最初只有construtor属性, 
* 可以用isPrototypeOf()来判断实例的原型; 可以用Object.getPrototypeOf()来获取实例的原型
```
Person.prototype.isPrototypeOf(person1); // true
Object.getPrototypeOf(person1);
```
