# 对象API

## 拓展冻结

### 冻结对象

+ `Object.freeze(obj || arr )` <=> `Object.isFrozen(obj)`;
+ 操作符和属性、原型都不可以修改
+ `freeze()` 返回和传入的参数相同的对象。
+ `不能添加` `不能删除` `不能修改`

### 密封对象

+ `Object.seal(obj)` <=> `Object.isSealed(obj)`;
+ 封闭一个对象，阻止添加新属性，不可删除属性、并将所有现有属性标记为不可配置。
+ 当前属性的只要可写（writable === true），其值就可以被更改。
+ `不能添加` `不能删除` `能修改`

### 可拓展

+ `Object.preventExtensions(obj)` <=> `Object.isExtensible(obj)`;
+ `Object.freeze` `Object.seal` `Object.preventExtensions` 都可以标记一个对象为不看拓展。
+ 让一个对象变的不可扩展，不能再添加新的属性，可修改和删除已有的属性。
+ `不能添加` `能删除` `能修改`

## 迭代操作

+ `Object.keys()`
+ `Object.values()`
+ `Objecr.entries()`

## 对象同等

+ `Object.is()`

## Object.assign(obj1, obj2, ... )

+ obj1  目标对象
+ obj2， ... 源对象

将后边多个对象整合到第一个对象中去，后者覆盖前者，只会拷贝可枚举的属性，返回第一个对象。

