let obj1 = {
    a: 1,
    str: 'abcdefg',
    b: null,
    c: [1,2,3,4],
    func: ()=>{ console.log( 'func' )},
    boolean: true,
    __proto__: {
        show: function(){
            console.log('show');
        }
    }
};


// let obj2 = { ...obj1 };
// let obj4 = JSON.parse(JSON.stringify(obj1));
// let obj3 = Object.assign( obj1 );

// obj1.func = () => console.log( 'func2' );
// obj1.b = 213;

// console.log( obj3 );
// console.log( obj2 );
// console.log( obj4 );

function clone(source){
    // 如果是源对象是null， 则返回null
    if( !typeof source === 'object'|| source === null) return source;
    // 非引用类型的源数据，如字符串和数字、布尔值，直接返回。
    if( typeof source !== 'object' ) return source;
    // 判断源数据是对象还是数组，然后区分赋值。 Array.isArray
    let target = Array.isArray(source) ? [] : {};
    // 获取对象所有的属性名或者数组的下标
    for (const key in source) {
        // 判断是不是私有属性
        if (source.hasOwnProperty(key)) {
            const el = source[key];
            // 如果值是引用类型，则继续重新遍历
            if( typeof el === 'object'){
                target[key] = clone(source[key]);
            }else{
                // 否则，则赋值到新对象中
                target[key] = source[key];
            }
        }
    };
    return target;
}

let obj2 = clone( obj1 );

obj1.func = () => console.log( 'func2' );

console.log( obj1 );
console.log( obj2 );

// "[object Number / string / object / array / undefined / null / boolean]" "[object Number]" "[object Number]" "[object Number]" "[object Number]" "[object Number]" 