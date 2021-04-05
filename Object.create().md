# Object.create

## 语法参数

​	`Object.create(proto, [propertiesObject])`

+ 创建一个对象，并将新对象的`__proto__`指向 `proto `
+ `propretiesObject`为可选对象，该传入对象的自有可枚举属性(即其自身定义的属性，而不是其原型链上的枚举属性)，将为新创建的对象添加指定的属性值和对应的属性描述符。这些属性对应[`Object.defineProperties()`](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperties)的第二个参数。
+ 在指定原型对象上添加新属性后的对象。

```javascript
let obj = {
    name: 'herry',
};
let obj1 = new Object(obj);
let obj2 = Object.create(obj, {
    name: {
        // 遍历当前对象，是否可以遍历出当前属性  enumerable / configurable / writeable 
        enumerable: true,
        // writable:true,
        configurable: true,
        // value: 'tom',
        get: function(){
            console.log('getting tom');
        },
        set: () => {
            console.log( 'setting tom' );
        }
    },
    age: {
        writable: true,
        enumerable: false,
        value: 20
    }
});
console.log( obj1 );
console.log( obj2 );
```



![tupian](https://github.com/Miracle-chen/images/blob/master/object/Object.create/01.png)



## `Object.create()` 与 `new Object`的区别

### 创建对象的方式不同

+ `new Object(obj)`创建对象，所添加的属性都是其自身实例的属性。
+ `Object.create(obj,[propertiesObject] )` 是将创建的对象`__proto__`指向`obj`,其实例可以继承`obj`属性。可以通过第二个参数添加其实例自身属性。
+ 代码示例如上。

### 属性描述符默认值不同

+ `Object.create()`第二个参数来创建非空对象的属性描述符默认为false，而构造函数或字面量方法创建的对象属性的描述符默认为true。

# 拓展

## 对象属性操作符

+ `getOwnPropertyDescriptor(obj, key)` 获取对象自身某一属性的描述符

+ `getOwnPropertyDescriptors(obj)` 获取一个对象自身所有的描述符

+ `defineProperties(obj, props)` 在一个对象上定义新的属性或修改现有属性，并返回该对象

+ `defineProperty(obj, key, descriptor)` 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性

+ `getOwnPropertyNames(obj)` 查找对象不包括`Symbol`类型的所有的属性名

+ `getOwnPropertySymbols(obj)` 查找对象所有的`Symbol`类型的属性名

+ `hasOwnProperty(key)` 对象自身是否含有指定的属性

  **代码示例：**

```javascript
"use strict";
let adress = Symbol('address');
let phone = Symbol('phone');
let obj = {
    name: 'jerry',
    age: 18,
    [adress]: 'shenzhen',
    [phone]: '123456789',
}
Object.getOwnPropertyNames( obj );   // => ['name', 'obj']
Object.getOwnPropertySymbols(obj); // => [ Symbol('address'), Symbol('phone') ]
Object.getOwnPropertyDescriptor(obj, 'name');  // => { writable: true, configurable: true, enumerable: true, value: 'jerry' }
Object.getOwnPropertyDescriptors( obj ); // => { name: { writable: true, configurable: true, enumerable: true, value: 'jerry' } , age: { ... }}
Object.hasOwnProperty('name'); // => true
Object.defineProperty(obj, 'age', {
    writable: false
});
Object.defineProperties(obj, {
    name: {
        enumerable: false
    }
});
// obj.age = 20;  // TypeError  //已设置只读属性
for (const key in obj) {
    // for in 不会遍历出 Symbol 类型 以及 操作符 enumerable  为 false 的属性
    console.log( key );  // age
}
```

## 对象的原型操作

### 更改对象原型

+ `Object.create(obj, [propertiesKey] )`
+ `Object.setPrototypeOf(obj1, obj2 )`  // 将`obj2`设置为`obj1`的原型

### 读取对象原型

+ `Object.getPrototypeOf(obj) `

### 判断是否是原型

+ `Object.prototype.isPrototypeOf(obj)`

  **代码示例：**

```javascript
let obj1 = { name: '12' };
let obj2 = {};
// 设置 obj1 为 obj2 的原型
Object.setPrototypeOf(obj2, obj1);
// 获取obj2的原型
Object.getPrototypeOf( obj2 );
// 判断obj1是不是obj2的原型
obj1.isPrototypeOf( obj2 );
```

参考文章：

[1. Object.create()](https://www.jianshu.com/p/28d85bebe599)