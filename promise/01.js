function hd() {
    console.log('hd');
}

var arr = [
    { name: '小米1', value: 1, type: 2, date: '2018-06-07T08:00:01.589Z' },
    { name: '锤子T1', value: 1, type: 2, date: '2018-06-07T08:10:01.589Z' },
    { name: '小米2', value: 1, type: 4, date: '2018-06-07T20:00:01.589Z' },
    { name: '小米2', value: 4, type: 4, date: '2018-06-07T20:10:21.189Z' },
    { name: '小米4', value: 1, type: 4, date: '2018-06-07T08:00:01.560Z' },
    { name: '小米4', value: 2, type: 4, date: '2018-06-07T08:10:31.584Z' },
    { name: '小米6', value: 1, type: 3, date: '2018-06-07T08:00:01.589Z' },
    { name: '小米5s', value: 1, type: 4, date: '2018-06-07T08:00:01.589Z' },
    { name: '锤子T2', value: 1, type: 4, date: '2018-06-07T08:00:01.589Z' },
    { name: '锤子T1', value: 4, type: 4, date: '2018-06-07T08:06:01.589Z' },
    { name: '魅蓝note5', value: 1, type: 4, date: '2018-06-07T08:00:01.589Z' },
    { name: '魅蓝note2', value: 5, type: 4, date: '2018-06-02T08:07:01.589Z' },
    { name: '魅蓝note2', value: 6, type: 4, date: '2018-06-07T08:00:01.589Z' },
    { name: '魅蓝note3', value: 1, type: 4, date: '2018-06-05T08:00:01.589Z' },
    { name: '魅蓝note', value: 1, type: 4, date: '2018-06-07T08:00:01.589Z' },
    { name: 'oppor9', value: 7, type: 4, date: '2018-06-04T08:04:01.588Z' },
    { name: '华为p9', value: 1, type: 4, date: '2018-06-02T08:00:01.577Z' },
    { name: '华为p9', value: 2, type: 4, date: '2018-06-07T08:00:01.110Z' },
    { name: '华为p10', value: 1, type: 1, date: '2018-06-07T08:00:01.534Z' }
];

renderDt = (dt) => {
    return moment(dt).format('YYYY年MM月DD日')
}
// 请用您认为最优化的方式，将arr中的type为4的数据过滤出来
let arr1 = arr.filter( i => i.type === 4 );
console.log( arr1 );

// 然后按 value 降序(从大到小)排序
let arr2 = arr.sort((a, b) => b.value - a.value );
console.log( arr2 );

// 然后按相同的 name + date（按天）合并value（value累加）
let newList = arr.reduce( ( acc, cur ) => {
    if( acc.find( i => i.name === cur.name && renderDt(i.date) === renderDt(cur.date) )){
        let total = [];
        for( let j = 0; j < acc.length; j ++ ){
            if( acc[j].name === cur.name && renderDt(acc[j].date) === renderDt(cur.date) ){
                acc[j].value += cur.value;
            };
            total.push( acc[j] );
        };
        acc = total;
    }else{
        acc.push( cur );
    };
    return acc;
}, []);

console.log( newList );


// 最后每行按照 "${name},${本地日期},售出${sum(value)}部" 的格式，如："小米2,2017年06月08日,售出5部", 打印(console.log)出来。
newList.map( i => {
    console.log( `${ i.name},${ renderDt(i.date) },售出${ i.value }部`);
})