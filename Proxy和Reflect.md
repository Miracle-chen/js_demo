# Proxy和Reflect

## Proxy

​		`new Proxy(target, handler)` Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。

+ target 数据源
+ handler 代理 target 的指定行为。

#### 可以从下边代码中，了解下其用法：

```javascript
// 属性访问 触发get; 复制和添加属性， 触发set; 是否含有in，触发 has
let target = {
    name: 'zhangsan',
    age: 20,
};
let handler = {
    // 实例方法:  get(target, key, receiver )
    get: function(target, key){
        return target[key];
    },
    // 实例方法： set(target, key, value, receiver )
    // receiver 一般是指Proxy实例本身
    set: function(target,key, value){
        // 实现私有属性读取保护，私有属性禁止访问。
        if(key[0] === '_'){
          throw new Erro(`Invalid attempt to get private     "${key}"`);
      	}
        if( key === 'age' && typeof value != 'number' ){
            throw new Error('年龄格式不对，请输入数字');
        }
        target[key] = value;
        // 严格模式下，set 不返回true会报错。
        return true;
    },
    // 实例方法： has(target, key)
    has: function( target, key ){
        console.log("handle has");
        // 这种方式判断不了是对象自身属性还是原型链上的属性
        // return key in target;
        //改下，校验函数自身有没有这个属性
        return target.hasOwnProperty(key);
    },
    // 实例方法： defineProperty(target, key, value ) ,与set方法类似，但是set的优先级较高，同时存在的话，会被set覆盖。
    defineProperty：function( target, key, value ){
        console.log( 'defineProperty' );
        target.key = value;
    },
    // 实例方法： 获取属性描述符
    getOwnPropertyDescriptor: function(target, key){
        return Object.getOwnPropertyDescriptor(target, key);
    },
    // ... 可以再此处设置更多的实例方法，如getPrototypeOf、isExtensible等等，用来拦截Object原型链上所包含的属性，同时可以做一些其他的逻辑处理。
};
let proxy = new Proxy(target,handler );
let name = proxy.name;
proxy.name='lisi';
proxy.age = 23;
// Object.create(proto, [ propretiesObj ]) 创建一个对象，并将对象原型指向第一个参数proto，proprttiesObj是新对象的初始值。
let obj = Object.create(proxy);
// get 方法可以继承
obj.name;
'name' in proxy;
```

#### 取消Proxy代理

`Proxy.revocable`

直接从代码中看：

```javascript
let { proxy, revock } = Proxy.recocable({}, {});
proxy.name = 'jerry';
console.log( proxy ); // { name: 'jerry' }
revock();
proxy.name = 'tom';  //TypeError: Cannot perform 'set' on a proxy that has been revoked
```



## Reflect

#### 注意项：

Reflect是一个内置对象，不是构造函数，因此不能通过 new 关键字来调用，也不能作为函数来使用。

#### Reflect.get(target,  propertyKey, receiver)

```javascript
let data = {
    name: 'tom',
    age: 20,
    get info(){
        return this.name + ' ' + this.age;
    }
};
let zhangsan = {
    name:'zhangsan',
    age: 40
}
// 如果target对象中，对应的propertyKey存在getter方法，则会将getter方法的this指向 receiver
Reflect.get( data, 'info', zhangsan );  // zhangsan 40
Reflect.get( data, 'info' );  // tom 20
```

