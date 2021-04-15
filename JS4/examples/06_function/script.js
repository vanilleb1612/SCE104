"use strict";

// ********************************* //
// Standard function syntax
// ********************************* //

// declaration of function
function myFunction(a,b) {
  
  console.log('first variable a=',a);
  console.log('second variable b=',b);

  
  // optional return value
  return 12;
}

// Call the function
myFunction(1,2);
console.log( myFunction("elephant",[7,5]) );

// Function can be called with less arguments than expected
console.log("====== Not enough arguments ======");
myFunction(1); // the second argument is undefined


// ********************************* //
// Function as variable
// ********************************* //

// Functions are treated as basic variables
const a = myFunction;
console.log("====== Function as variable ======");
a(7,8);
console.log(a);

// Functions can be declared inline
const square = function(x) { return x*x; }
console.log("5^2=", square(5) );

// Short arrow-function
const power3 = (x)=>x*x*x;
console.log("5^3=", power3(5) );

// Arrow function modeling a dot product between two vectors
const dot = (a,b) => a.x*b.x + a.y*b.y;
const p1 = {x:5, y:1};
const p2 = {x:7, y:-2};
console.log( "p1.p2 = ",dot(p1,p2) );


// As simple variables, functions can be stored in dictionary
const behavior = {
  printHello : () => console.log("Hello!"), // arrow-function without argument
  areaDisc : (radius) => radius*radius*Math.PI,
}

behavior.printHello();
console.log("area of disc with radius",3," : ",behavior.areaDisc(3));



if(l<=b){
  console.log(func(l));
  console.log(l+k);
}


var list = console.log(thefunction.join())
title.textContent=(list)


e.textContent+=(func(l).join());