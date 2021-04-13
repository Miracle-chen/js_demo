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

## api

### replace

+ `stringObject.replace(regexp/substr,replacement)`
+ 字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
+ 返回值是一个匹配到的数组。

