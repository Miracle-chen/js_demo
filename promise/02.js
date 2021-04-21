
function hdcms (){
    hd();
}

// function quene(num){
//     let promise = Promise.resolve();
//     num.map( item => {
//         promise = promise.then(_ => {
//             return new Promise(resolve => {
//                 setTimeout(()=>{
//                     console.log( item);
//                     resolve();
//                 }, 1000)
//             })
//         })
//     });
// }

// function quene(num){
//     num.reduce((promise, cur) => {
//         return promise.then(_ => {
//             return new Promise( resolve => {
//                 setTimeout(() => {
//                     console.log( cur );
//                     resolve();
//                 }, 1000);
//             })
//         })
//     }, Promise.resolve())
// }

// quene([1,2,3,4,5,6,7,8,9,10]);

// async function catchError(){
//     try {
//         console.log( b );
//     } catch (error) {
//         console.log( error );
//     }
//     console.log( a );
// };

// catchError().catch( err => console.log( err ));

// let i = 0;

// setTimeout(() => {
//     console.log( i ++ );
// }, 1000);

// setTimeout(() => {
//     console.log( ++ i );
// }, 1000);



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

