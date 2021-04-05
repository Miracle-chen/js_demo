# bind call apply

> function.bind(thisArg, arg1, arg2, ... )

> function.apply(thisArg, [arg1, arg2, ... ])

> function.call(thisArg, arg1, arg2, ... )

+ 都是改变函数的`执行上下文`,也就是this指向的api，都会将function的this指向其第一个参数thisArg。
+ call 和 apply 会立即执行函数，而bind不会，返回的是一个函数，需要()手动执行。
+ call 和 bind 可以接收多个参数，除第二个参数开始，都会被function接收。
+ apply 只有两个参数， 第二个参数要是数组或者类数组，会被function接收。
+ 第一个参数如果为null，this就会指向window。

### 以下通过小例子看下这三个API

```javascript
// 示例一
let lessons = { php: 90, js: 102, html: 92, css: 85 };
// 借用Math.max方法。将lessons的值集合传给Math.max，此时不需要使用this，故第一个参数可传可不传。
Math.max.apply( null, Object.values( lessons) );   // 102

// 示例二
var name = 'zhansgan', age = 18;
var obj = {
    show: function(...args){
        return this.name +'=' + this.age ;
    }
};
let db = {
    name: 'zhangsan',
    age: 30
};
obj.show.call( db );  // 将obj中的this指向 db对象。
obj.show.bind( db )();  // 将obj中的this指向 db对象。
```



