
// var a = function(){
//     console.log( 'a' );
// };

// var a;

// console.log( a );

// 闭包

// function outer(){
//     let num = 100;
//     return function inner(){
//         console.log( num ++ );
//     }
// };

// let func = outer();

// func();
// func();

// js创建对象的方式

// let obj1 = {};


// let obj2 = Object.create({a: 1});

// let obj3 = new Object();

// console.log( obj1, obj2, obj3 );


// function Person(name, age){
//     this.name = name;
//     this.age = age;
//     this.showName = () => {
//         console.log( this.name );
//     }
// };
// Person.prototype.showInfo = function(){
//     return this.name + ' --- ' + this.age
// }

// class Person{
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//         this.showName = () => {
//             console.log( name );
//         }
//     };
//     showInfo(){
//         return this.name + ' --- ' + this.age
//     }
// }

// let zhangsan = new Person('zhangsan', 20);
// console.log( zhangsan );

// let info = zhangsan.showInfo();
// console.log( info );

// event loop
setTimeout(function () {
    console.log('a');
    new Promise(function (resolve, reject) {
        resolve();
        console.log('b');
    }).then(function () {
        console.log('c')
    })
}, 1000)
setTimeout(function () {
    console.log('d');
}, 0)
new Promise(function (resolve, reject) {
    reject();
    console.log('e');
}).then(function () {
    console.log('f')
}).catch(() => {
    console.log('g')
})
console.log('h')


// e  h  g  d  a  b  c
