# let & const

## let 

+ 块状作用域
+ 禁止重复声明
+ 没有变量提升

## const 

`const声明的是一个指针，指向的是内存地址。对于基本类型，可以当做一个常量，对于引用类型，则是只能保证指针是固定的，至于指针指向的数据结构变不变就无法控制了。`

# 解构

## 数组类型

```javascript
// 基本
let [ a, b ] = [ 1, 2 ];
// 可嵌套
let [ a, [b] ] = [ 1, [2] ];
// 可忽略
let [ a, , b ] = [ 1, 2, 3 ];
// 不完全解构
let [ a, b ] = [ 1 ];
// 剩余运算符
let [ a, ...b ] = [ 1, 2, 3, 4 ];
// 字符串解构
let [ a, ...b ] = 'javascript';   // a => j   b => ["a", "v", "a", "s", "c", "r", "i", "p", "t"]
// 解构默认值
let [ a = 3, b ] = [ 1, 2 ];
```

## 对象类型

```javascript
 // 类似数组解构
```

# Symbol

`原始数据类型，表示独一无二的值`

+ 作为属性名，保证属性不重名
+ 取值时候不能用.，要用[]
+ 作为公有属性，不会出现在for...in / for ... of  / Object.keys / Object.getOwnPropertyNames 返回。可以通过Object.getOwnPropertySymbols / Reflect.ownKeys 获取到。
+ 定义常量。

## 定义和取值

+ Symbol / description
+ Symbol.for / Symbol.keyFor()
+ 多个相同的key定义的Symbol.for(key) ，指向同一个内存地址 --- (Symbol.for() 类似单例模式，首先会在全局搜索被登记的 Symbol 中是否有该字符串参数作为名称的 Symbol 值，如果有即返回该 Symbol 值，若没有则新建并返回一个以该字符串参数为名称的 Symbol 值，并登记在全局环境中供搜索)。

```javascript
let a = Symbol('aaa');
cosnole.log( a.description ); // aaa
let b = Symbol.for('bbb');
console.log( Symbol.keyFor(b)); // bbb

//
let RED = Symbol('red');
let Red2 = Symbol('red');

let symObj = {};
symObj[RED] = '123';
symObj[Red2] = '234';

```

# Proxy







