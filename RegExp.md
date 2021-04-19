# RegExp

## 声明的方式

+ `/\d/g`
+ `new RegExp('u', 'g')`

## 选择符

+ ` | ` 选择修饰符，匹配其前后一项表达式均可。

  ```javascript
  let mobile = '010-9999999';
  // ^ => 开头  $ => 结尾 / => 转义符  \d => 数字 () =>原子组  | => 选择符
  let reg = /^(010|020)\-\d{7,8}$/;
  // let reg = /010|020\-\d{7,8}/;  // 错误
  // let reg = /(010 | 020)\-\d{7,8}/;  // 错误
  reg.test(mobile);  
  ```

## 转义符

将特殊字符转义成普通的字符。

`.`有两个含义，`除换行外的所有字符` 和`普通点`

```javascript
let price = 12.23;
// 字符串中 '\d' === 'd', 在使用呢哇RegExp的时候，要多转义一次
let reg = new RegExp('\\d{2}\\.\\d{2}');

console.log(reg.test(price));
console.log( /\d{2}\.\d{2}/.test(price));

// 匹配网址
let url = 'http://www.baidu.com';
let reg = /^https?:\/\/\w+\.\w+\.\w+$/;
reg.test(url);
```

## 边界字符

+ `^`
+ `$`

## 模式修饰符

可以组合使用。

| 修饰符 | 作用                         |
| :----: | :--------------------------- |
|   i    | 忽略大小写，统一转化为小写   |
|   g    | 全局搜索匹配内容             |
|   m    | 视为多行                     |
|   s    | 忽略转行符，视为单行         |
|   y    | 从`regexp.lastIndex`开始匹配 |
|   u    | 正确处理四个字符的UTF-16编码 |

```javascript
// m 多行匹配修正符
let hd = `
    #1 js,200元 #
    #2 php,300元 #
    #9 houdunren.com # 后盾人
    #3 node.js,180元 #
`;
let arr = [];
let list = hd.match(/^\s*#\d+\s+.+\s+#$/gm).map( i => {
    let item = i.replace(/\s*#\d+\s*/, "").replace(/\s+#\s*/, "");
    let [key, value] = item.split(',');
    arr.push({ name: key, price: value })
})
console.log( arr );
```



## 匹配

+ `[a-zA-Z] ` =>  匹配大小写字母，空格也是一个普通字符，同`\s`。
+ `[^a-zA-Z] ` => 匹配非大小写字符    原子组中的 ^ 为取反。
+ `{m, n}`  => 最少m位，做多n位。n位可选，为空则无上限。
+ `\d` => 数字
+ `\D`  =>匹配非数字
+ `\s` => 匹配空白符
+ `\S` => 除了空白
+ `\w`  => 字母数字下划线
+ `\W`  => 除了字母数字下划线
+ `.` 除了换行符意外的所有字符。
+ `+` 一个或多个
+ `?` 零个或者一个
+ `*` 任意个
+ 可以利用相反操作符来匹配全字符， 如 `/\d\D/+`

## 禁止贪婪

| 使用   | 说明                            |
| ------ | ------------------------------- |
| *?     | 重复任意次，但尽可能少重复      |
| +?     | 重复1次或更多次，但尽可能少重复 |
| ??     | 重复0次或1次，但尽可能少重复    |
| {n,m}? | 重复n到m次，但尽可能少重复      |
| {n,}?  | 重复n次以上，但尽可能少重复     |

## 原子表

+ [abc]  => 匹配a、b、c 单词
+ [a-zA-Z0-9]
+ [ ^ue ]  => 排除匹配 ^
+ [ .+ ]  => 匹配 . + ，原子表字符不解析

## 原子组

+ 如 replace中的`(<h[]1-6]>)`

## api

### replace

+ `stringObject.replace(regexp/substr,replacement)`
+ 字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
+ 返回值是一个匹配到的数组。

```javascript
// 正则操作DOM元素 ， 删除h1 - h6
// \1 匹配第一个组   后的 $n 可以获取到替换规格的第n个原子组的内容，0 是整个内容 原子组的位置以 ( 的位置决定，如 1 就是第一个()包围的内容
document.body.innerHTML = document.body.innerHTML.replace(/<(h[1-6])>[\s\S}]*<\/\1>/i, `$1`)
```

### match

+ 返回匹配到的元素组合或者null
+ 有g，返回所有匹配到的元素的数组集合。
+ 没有g，返回匹配到的第一个元素的信息，如[ 元素，index：元素的下标 , input: 检测的数据, groups:undefined]。

### matchAll

+ 新浏览器支持， 返回一个迭代对象。

```javascript
let str = "houdunren";
let reg = /[a-z]/ig;
for (const iterator of str.matchAll(reg)) {
  console.log(iterator);
}
```

### search

+ 检索字符串中指定的子字符串，也可以使用正则表达式搜索，返回值为索引位置

```javascript
let str = "houdunren.com";
console.log(str.search("com"));
console.log(str.search(/\.com/i));
```

### split

+ 使用正则表达式来分割字符串

```javascript
let str = "2023/02-12";
console.log(str.split(/-|\//));
```

### test

+ 检测是否满足正则表达式格式要求。返回 boolean

## 断言匹配

断言虽然也是写在括号中，但是不属于组，不会在匹配结果中保存。可以将断言理解为正则表达式中的条件。

### 先行断言

`(?=exp)` 匹配后边是exp的内容。

如： 把后面是`教程` 的后盾人汉字加上链接， 不是的前边加上后盾人

```javascript
<body>
  <main>
    后盾人不断分享视频教程，学习后盾人教程提升编程能力。
  </main>
</body>

<script>
  const main = document.querySelector("main");
  const reg = /后盾人(?=教程)/gi;
  main.innerHTML = main.innerHTML.replace(
    reg,
    v => `<a href="https://houdunren.com">${v}</a>`
  );
main.inner
</script>
```

### 后行断言

`(?<=exp)`  匹配前边是exp的内容

```javascript
// 获取前边是abc的数字
let str = 'abc1234sdf234';
console.log(str.match(/(?<=abc)\d+/g));

// 模糊电话号码
let users = `
    电话1: 12345678901
    电话2: 98745675603
`;

let reg = /(?<=\d{7})\d{4}/g;

users = users.replace(reg, i => '*'.repeat(4));

console.log( users );
```

### 负向先行断言

`(?!reg)`  后边不是reg的

### 负向后行断言

`(?<!reg)`  前边不是reg的