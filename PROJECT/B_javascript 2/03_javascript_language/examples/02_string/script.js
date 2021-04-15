"use strict";


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