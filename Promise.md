# Promise

setInterval 和 setTimeOut 是宏任务队列，then是微任务队列。在代码执行的过程中，先执行主线程的代码，然后在执行微任务队列的，最后执行宏任务队列的。

promise只有在改变状态的时候，如 reject和resolve执行的时候，才会创建微任务。

只有promise的状态改变之后，才会在then和catch里边执行对应逻辑代码，否则就会一直等待状体的改变。

promise.then 也是一个 promise函数。

可以使用final 来执行promise状态改变之后的代码逻辑。

+  `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`
+ 

## promise异步加载script

```javascript
// 01.js
function hd(){
    console.log( 'hd' );
}
// 02.js  依赖 01.js
function hdcms (){
    hd();
}
// index.js
loadScript(path){
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src= path;
        script.onload = () => resolve(script);
        script.onerror = () => reject();
        document.body.appendChild(script);
    })
}
loadScript('./01.js').then((script) => loadScript('./02.js')).then( script => hdcms() )
```

# todos

query.cache

