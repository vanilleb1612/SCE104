"use strict";

// Declaration of an array
const a = [1,3,4,5];
console.log(a);

// Arrays are 0-indexed
a[0] = 8;
a[1] = 0;
a[3] = -2;
console.log(a);

// Arrays have dynamic size
a.push(9);
a.push(12);
console.log(a);

// Arrays are sparsed
// they are stored internaly as dictionar (not as consecutive table)
a[201] = 4;
a[-45] = 8;
console.log(a);

// Arrays can contain mix elements
const b = [7,'elephant',1.4,['another array',9]];
console.log(b);

// Arrays declared as const cannot be re-assigned, but their content can still be modified
b[0] = -12;
b[1] = b[1]+' girafe';
console.log(b);
//b = [1,4,5]; //doesn't work as b is const: it would be a re-assignment

// Length of an array
console.log( "a.length = ",a.length);
console.log( "b.length = ",b.length);

// Looping over an array
const array = [4,8,-4.1,'value',-1];
for( const k in array ) {
  console.log(`k=${k}, array[${k}]=${array[k]}`)
}
