"use strict";

// This is a JavaScript comment

/* This is another comment.
   This comment can span several lines */


// ================================ //
// Declaring variables
// ================================ //

// Using let
// *********** //
let a = 5;
let b = a+5;
let c = 'Hello Javascript';

console.log('a=',a);
console.log('b=',a);
console.log('c=',a);

// Variables declared using let can be re-assigned, potentially using other types
a = 12;
b = 'some string'; // types are automatically infered

console.log('a=',a);
console.log('b=',b);

// Using const
// *********** //
const d = 10;
console.log('d=',d);

// Uncommenting the following statement would be a JavaScript error
// d = 15;

// Using var
// *********** //
var e = 10;
console.log('e=',e);

// Variables declared as var can be re-assigned.
// Avoid using var declaration, and prefer const/let


// ================================ //
// String
// ================================ //

const s1 = 'strings can be declared between simple quote';
const s2 = "or also between double quote";

const s3 = 'Simple quote can have "double quote inside". ';
const s4 = "Conversely, 'simple' quote can be inside double quote";

console.log(s1,s2);
console.log(s3,s4);

const s5 = 'adding string results in ';
const s6 = 'concatenation';
const s7 = s5+s6+'!';
console.log(s7);

const some_variable = 15;
// template literals can be used to insert variables inside string
const s8 = `3+7=${3+7}, value of some_variable=${some_variable}`;
console.log(s8);