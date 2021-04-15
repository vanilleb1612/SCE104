"use strict";

// General objects in JavaScript can be seen as dictionary
const a = { property:"value" }; // declare a JavaScrip Object

console.log( a ); // print the object
console.log( a.property );    // print the value (structure style)
console.log( a["property"] ); // print the value (array style)

// Dictionary can contains arbitrary number of properties
const p = {x:0, y:0};
p.x=12;
p.y=25;
console.log(p);

// Properties can be dynamically added to the object
p.z = -1;
console.log(p);

// Loop over properties of the object
for( const prop in p ) {
  console.log("property: ",prop );
  console.log(`p[${prop}] = ${p[prop]}`);
}

// Dictionary can contain other dictionaries
const general_variable = {
  position: {x:0, y:5, z:8} ,
  radius: 1.4,
  name: "My Data",
  values: {
    field: [7,4,3,2],
    empty_space:null,
  },
}

console.log( general_variable );
console.log( general_variable.position.z );
console.log( general_variable.values.field[2] );

// Note:
//  a 'null' value should indicate the absence of value (ex. initializing a value without setting the value).
//  a 'undefined' value indicates an error (ex. accessing a field that doesn't exists).