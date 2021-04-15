"use strict";


// ************************ //
// Syntax
// ************************ //

const a = 12;

// Syntax for conditional
// else is optionnal
if( a>15 ) {
  console.log("a is greater than 15");
}
else if( a>=10 ) {
  console.log("a is between 10 and 15");
}
else {
  console.log("a is less than 10");
}


// Syntax for loop
// for(initialization; endCondition; iteration)
for( let k=2; k<10; k++ ) {
  
  if( k%2 ===0 ) {
    console.log(k,' is even');
  }
  else {
    console.log(k,' is odd');
  }

}


// ************************ //
// variable scope
// ************************ //

// let and const have block-scope

{
  const b = 15;
  let c = 16;
  var d = 17;

  // b,c,d exist in this block of code
} // b and c are erased at the termination of the bloc

// d still exists outside of this bloc. 
// variables declared as 'var' have function-scope
console.log(d);
// console.log(b); // doesn't work here
// console.log(c); // doesn't work here

// Good practice rules:
// ----------------------
// - Prefer const variable (smaller scope, non re-assignable)
// - If the variable should be re-assigned, use let (smaller scope than var)
// - In exceptional case, var can be used when function scope brings advantage



