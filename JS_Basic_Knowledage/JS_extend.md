# 继承
(继承的实质丢弃默认原型, **重写原型为另外一个类型的实例**, 利用搜索机制从而找到实例的原型方法)

### 继承的6中实现方式
* 利用原型链实现继承: 重写原型为某个类型的实例, 通过搜索机制, 从而继承了某个类型的属性和方法
> 提示： 使用原型链实现继承，**缺点**有一如果原型有引用类型, 所有实例都可以操控这个引用类型; 有二在子类型实例时, 不能向超类型的构造函数传递参数; 所以很少单独用原型链, 就有了借用构造函数的方式实现继承 
* 借用构造函数实现继承
> 提示: 思想是在子类型的构造函数内部用超类型的构造函数(当普通函数用call, apply来调用)
> 解决了共享引用属性的问题, 也解决了向超类型船体参数问题
> 在调用了超类型构造函数后， 再添加自己的属性, 避免被超类型同名属性覆盖
* 组合原型链和借用构造函数实现继承(**最常用的继承方式**)
> 思想：使用原型链实现对原型继承, 使用构造函数实现实例属性继承
> 缺点： 调用了两次构造函数！ 第一次重写原型时, 实例执行了构造函数且原型有超类属性; 第二次在实例时候执行子类构造函数, call/apply 了超类构造函数生成了实例属性, 因为同名所以屏蔽调了原型的属性.
* 原型式继承
> Object.create()就是原型式继承
* 寄生式继承
* 寄生组合式继承