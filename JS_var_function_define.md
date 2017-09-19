### JS变量提升和声明式函数提升
* var变量提升，但是赋值语句还是在以前的地方；变量提升之后，以前的位置就只有赋值语句了
* 没有var定义，则为全局变量
* 声明式函数提升，但是排在变量提升之后；函数提升之后，以前的那个位置就被抽空了
* 变量和函数同名，后面的会覆盖掉前面的
* 如果局部变量和全局变量同名， 那么局部变量覆盖全局变量
> 例子1：
```
alert(a);
a();
var a = 3; 
function a(){
	alert(10);
}
alert(a);
a = 6; 
a();
```
相当于下面的代码
```
var a;
function a(){
	alert(10);
}
alert(a); // a(){alert(10);}
a(); // 10;
a = 3;
alert(a); // 3
a = 6;
a(); // a is not a function
```
> 例子2：
```
function v(){
	console.log(a);
	var a = 1;
	console.log(a);
	function a(){};
	console.log(a);
	console.log(b);
	var b = 2;
	console.log(b);
	function b(){};
	console.log(b);
}
v();
```
相当于： 
```
function v(){
	var a;
	var b;
	function a(){};
	function b(){};
	console.log(a); // a(){};
	a = 1;
	console.log(a); // 1
	console.log(a); // 1
	console.log(b); // b(){};
	b = 2;
	console.log(b); // 2
	console.log(b); // 2
}
v();
```
> 例子3 :
```
var a = 1;
console.log(a);
function v(){
	console.log(a);
	a = 'aaa';
	console.log(a);
	var a = 'bbb';
	console.log(a);
    b = 2;
    console.log(b);
    console.log(c);
    c = 1;
    console.log(c);
    var c = 2;
    console.log(c);
}
v();
console.log(a);
console.log(b);
console.log(c);
```
相当于：
```
var a;
var b;
a = 1;
console.log(a); // 1 -> global
function v(){
	var a;
	var c;
	console.log(a); // undefined -> local
	a = 'aaa';
	console.log(a); // 'aaa' -> local
	a = 'bbb';
	console.log(a); // 'bbb' -> local
	b = 2;
    console.log(b); // 2 -> global
    console.log(c); // undefined
    c = 1;
    console.log(c); // 1
    c = 2;
    console.log(c); // 2
}
v();
console.log(a); // 1 --> global
console.log(b); // 2 --> global
console.log(c); // c is not defined
```