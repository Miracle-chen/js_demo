let RED = Symbol('red');
let Red2 = Symbol('red');

let symObj = {};
symObj[RED] = RED;
Symbol[Red2] = Red2;

console.table(symObj);

