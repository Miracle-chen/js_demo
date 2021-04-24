# Promise

setInterval 和 setTimeOut 是宏任务队列，then是微任务队列。在代码执行的过程中，先执行主线程的代码，然后在执行微任务队列的，最后执行宏任务队列的。

promise只有在改变状态的时候，如 reject和resolve执行的时候，才会创建微任务。

只有promise的状态改变之后，才会在then和catch里边执行对应逻辑代码，否则就会一直等待状体的改变。

promise.then 也是一个 promise函数。

可以使用final 来执行promise状态改变之后的代码逻辑。

+  Promise.reject `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`
+ Promise.resolve()
+ Promise.all(promises) 将多个promise实例包装成一个新的promise实例，失败和成功的返回值是不同的，失败的时候会返回第一个被reject的值，成功的时候会返回一个结果数组。Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的
+ Promise.race(promises) 任何一个promise实例的状态发生变化，都会结束。无论是成功还是失败。 
+ Promise.allSettle(promises)  `Promise.allSettled()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。
+ Promise.any(promises) 只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。类似于race, 但是不会因为某个 Promise 变成`rejected`状态而结束。

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

## 使用map实现执行队列

```javascript
function quene(num){
    let promise = Promise.resolve();
    //创建10个promise.then, 只有上一个promise的状态发生变化， 如下代码中的 resolve()，才会执行then中的代码
    num.map( item => {
        promise = promise.then(_ => {
            return new Promise(resolve => {
                setTimeout(()=>{
                    console.log( item);
                    resolve();
                }, 1000)
            })
        })
    });
}

quene([1,2,3,4,5,6,7,8,9,10]);
```

## await 错误处理

### try{} catch(err){}

### catch

```javascript
async function catchError(){
    try {
        console.log( b );
    } catch (error) {
        console.log( error );
    }
    console.log( a );
};

catchError().catch( err => console.log( err ));
```

## 定时器任务轮询 进度条

```javascript
// 定时器 进度条
let i = 0;
function handler () {
    let i = 0;
    (
        function run(){
            let hd = document.querySelector('div');
            hd.innerHTML = i;
            hd.style.width = i + 'px';
            hd.style.background = 'red';
            if( ++ i <= 100 ){
                setTimeout(run, 20);
            }
        }
    )();
};
handler();
```

## 拆分任务，将任务拆分成多个子任务

+ 也可以在promise中执行叠加，会将其放在微任务中，在主线程执行完毕之后在执行。

```javascript
// 任务拆分
let num = 100000000;

let count = 0;

console.log( moment(new Date().getTime()).format('YYYY-MM-DD hh:mm:ss') );

// for( var i = 0; i<= num; i++){
//     count += i;
// };

// console.log( count );

function run () {
    for( var i = 0; i <= 10000000; i ++ ){
        if( num <= 0 ) break;
        count += num--;
    };
    console.log( count );

    if( num > 0 ){
        setTimeout(run, 10);
        console.log( count );
    }
}

run();

console.log( moment(new Date().getTime()).format('YYYY-MM-DD hh:mm:ss') );
```



# todos

query.cache



# js 任务

js是单线程的，同时只能做一件事儿。做完主线程的任务，再去做队列中的任务。执行顺序  js主线程  >  微任务  >  宏任务

## 宏任务和微任务

### 宏任务

+ 定时器

### 微任务

+ Promise then

