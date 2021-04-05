# let & const

## let 

+ 块状作用域
+ 禁止重复声明
+ 没有变量提升

```javascript
// 会打印 10 个 10，每次更改的时候，都是改的全局作用域中的 i
for( var i = 0; i< 10; i++ ){
    setTimeout(()=>{
        console.log( i );
    })
};

// 方法一：使用let,创建一个块状作用域
    for( let i = 0; i< 10; i++ ){
    setTimeout(()=>{
        console.log( i );
    })
};

// 方法二：匿名函数，立即执行。作用：创建一个独立的作用域
for( var i = 0; i< 10; i++ ){
    ((i) => {
        setTimeout(()=>{
            console.log( i );
        })
    })(i);
};
```

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

# Map

## 迭代器

+ 通过 Symbol.iterator 创建一个迭代器，指向当前数据结构的起始位置。

+ 随后通过 next 方法进行向下迭代指向下一个位置， next 方法会返回当前位置的对象，对象包含了 value 和 done 两个属性， value 是当前属性的值， done 用于判断是否遍历结束。

+ 当 done 为 true 时则遍历结束。

+ of 操作数必须是可迭代，这意味着如果是普通对象则无法进行迭代。如果数据结构类似于数组的形式，则可以借助 Array.from() 方法进行转换迭代。

+ 如 for ... of / for ... in / forEach / ...

+ 可迭代的数据类型： Array(包括类数组) / String / Set / Map

  + 类数组： TypedArray，有length属性的对象

  ```javascript
  const items = ["zero", "one"];
  const it = items[Symbol.iterator]();
   
  it.next();
  >{value: "zero", done: false}
  it.next();
  >{value: "one", done: false}
  it.next();
  >{value: undefined, done: true}
  ```

  

## Map和 对象的区别

+ Map的键名可以是任意的，而对象的只能是字符串或者Symbol。
+ Map的键值对个数可以通过`size`属性获取，而对象只能通过手动计算得到。
+ Object的属性名有可能和其原型链上的属性名重复，导致调用不到原型链上的被重复属性方法。
+ Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。

## Map常用的API

+ Map.size 返回 Map 的长度。
+ Map.set(key, value) 添加元素
+ Map.get(key) get方法读取key对应的键值，如果没有，返回undefined。
+ Map.has(key) 某个键是否在当前 Map 对象之中
+ Map.delete(key) delete方法删除某个键，返回true。如果删除失败，返回false。
+ Map.clear() 清除所有成员，没有返回值
+ Map.keys() 返回键名的遍历器（迭代器）
+ Map.values() 返回键值的遍历器（迭代器）
+ Map.entries() 返回键值对的遍历器（迭代器）
+ Map.forEach() 使用回调函数遍历每个成员

## 代码示例

```javascript
// map 实例化
let map = new Map();
// 参数是一个二维数组
let newMap = new Map([['name', 'jerry'], ['age', 18]]);

let str = 'string';
let obj = { str: '对象' };
let num = Number('string');

// 赋值元素
map.set(str, '字符串');
map.set(obj, '对象');

// 虽然 NaN 和任何值甚至和自己都不相等(NaN !== NaN 返回true)，NaN作为Map的键来说是没有区别的。
map.set(NaN, 'not a number');
map.set(num, 'not num');

// 判断是否包含
map.has(str);
// 长度
map.size;
// 删除某一项
map.delete(func);
// 删除全部
map.clear();
// 获取元素
map.get(obj); 

// for of 遍历 map / map.keys / map.values / map.entries
for( var [key, value] of map){
    console.log( key, value );
}

for( var [key, value] of map.entries()){
    console.log( key, value );
}

for( var key of map.keys()){
    console.log( key );
}

for( var value of map.values()){
    console.log( value );
}

// forEach遍历
map.forEach(( value, key) => console.log( value, key ));

// 对象的操作 --- 转化 / 克隆 / 合并
// map => 数组  (二维数组和map之间的转化)
console.log( Array.from( map ));
// map 克隆
let map2 = new Map([ ...map ]);

console.log( map === map2 );

let map3 = new Map( [...map,  ...newMap ] );

console.log( map3 );
```



# Set

+ Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
+ +0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复；
+ undefined 与 undefined 是恒等的，所以不重复；
+ NaN 与 NaN 是不恒等的，但是在 Set 中只能存一个，不重复。

## 常用API

+ Set.size 返回 长度。
+ Set.add(value) 添加元素
+ Set.get(key) get方法读取key对应的键值，如果没有，返回undefined。
+ Set.has(key) 某个键是否在当前 Set 对象之中
+ Set.delete(key) delete方法删除某个键，返回true。如果删除失败，返回false。
+ Set.clear() 清除所有成员，没有返回值
+ Set.keys() 返回键名的遍历器（迭代器）
+ Set.values() 返回键值的遍历器（迭代器）
+ Set.entries() 返回键值对的遍历器（迭代器）
+ Set.forEach() 使用回调函数遍历每个成员
+ `对Set来说，keys 和 values 返回的数据是一样的`

## 代码示例

```javascript
// 去重
let set1 = new Set([1, 2, 3, 4, 5, 5]);
let set2 = new Set([1, 2, 3]);
// 交集
let set3 = [...set1].filter( i => set2.has(i) );
// 差集
let set4 = new Set( [...set1].filter( i => !set2.has(i) ));
```













