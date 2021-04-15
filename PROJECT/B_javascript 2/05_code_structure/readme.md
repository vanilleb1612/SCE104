# Code structure

## Global variables

So far, your JavaScript program contains a set of variables, instructions and some functions.
Variables declared at the top of your program outside functions are called `global variables`. These variables can be accessed everywhere in your program. In particular, all the functions can access, possibly modify, the value of these global variables.

Exemple:
```javascript
// A global variable
let globalVariable = 5; 

function someFunction(x) {
  // globalVariable can be accessed and modified here
}

function someOtherFunction(x) {
  // globalVariable can also be accessed and modified here
}
```

The use of global variables have some advantages for small programs: they are simple to access and modify in any part of the program.
However, for large program, the number of variables you need to handle increase, leading to the use of a lot of global variables. Using lot of global variables for a large and complex project is associated to several drawbacks:
* You may not remember all your global variables in a large program. It is better to see your variables as local function arguments. (As a general rule, humans can keep in mind six to height variables, if you use more, you will need to refer to their declaration or the documentation)
```javascript
// Exemple with too much variables
let x=4, rotation=Math.PI/2, height=2.5, sizeX=4.8;
const T=[7,8,4,1], twist=0.25, w=1.2;
const f={z=7.4,table=[9,1,4],orientation=-Math.PI};
const func = (x)=x*Math.sqrt(x), H=7.8;
```
* You don't see immediately from your function signature which variable is used/modified. Your code is thus harder to understand.
```javascript
// This function seems to increase the value of some height value by dH
//  but it is not clear from this signature which height is modified
function increaseHeight(dH) {
  ... //rest of the code
}
```
```javascript
// Clearer code indicating in the parameters the variable height which is increased
function increaseHeight(height, dH) {
  ... //rest of the code
}
```

* You may inadvertently modify the value of a global variable in a function leading to unwanted side effects (hard to debug). Especially if your global variable has a common name (ex. `x`, `a`, `k`, etc).
```javascript
function increaseHeight(height, dH) {
  H = H + dH; // increase of a previously defined global variable H, instead of `height`
}
```
As a result, __good programming practices__ - in JavaScript as well as in any programming language - suggest to __limit the use of global variables__.

In the case you still use global variables, make sure their name is unique and explains well their role, avoid short names that you may reuse in other contexts.

## Example case

Let us consider the example where the user can click on two different boxes. Inside each box, the total number of left and right clicks are shown respectively by the first, and second number.

![](pics/clicks.apng)


### HTML/CSS setup

First, here is a possible html/css setup of such scene

```html
	<div class="left">
		<div class="box"> 0,0 </div>
	</div>

	<div class="right">
		<div class="box"> 0,0 </div>
  </div>
```

```css
div {
  display: inline-block;
  margin: 20px;
}

.box {
  width: 150px;
  height: 80px;
  padding: 20px;
  border: 2px solid black;
  user-select: none;
  text-align: center;
}

.left .box{
  background-color: red;
}

.right .box{
  background-color: yellow;
}

.box:active {
  background-color: white;
}
.box:hover {
  cursor: pointer;
}
```

Note: `user-select: none` avoids selecting the text inside the box when clicking on it.

### First possible JavaScript code

A first attempt to write the expected behavior in JavaScript would be the following

```javascript
"use strict";

let clickLeftRed     = 0;
let clickRightRed    = 0;
let clickLeftYellow  = 0;
let clickRightYellow = 0;

const redBox    = document.querySelector('.left .box');
const yellowBox = document.querySelector('.right .box');

redBox.addEventListener('click',clickLeftRedAction);
redBox.addEventListener('contextmenu',clickRightRedAction);
yellowBox.addEventListener('click',clickLeftYellowAction);
yellowBox.addEventListener('contextmenu',clickRightYellowAction);

function clickLeftRedAction(event) {
  clickLeftRed =  clickLeftRed+1;
  redBox.textContent = `${clickLeftRed}, ${clickRightRed}`;
}
function clickRightRedAction(event) {
  event.preventDefault();
  clickRightRed = clickRightRed+1;
  redBox.textContent = `${clickLeftRed}, ${clickRightRed}`;
}
function clickLeftYellowAction(event) {
  clickLeftYellow = clickLeftYellow+1;
  yellowBox.textContent = `${clickLeftYellow}, ${clickRightYellow}`;
}
function clickRightYellowAction(event) {
  event.preventDefault();
  clickRightYellow = clickRightYellow+1;
  yellowBox.textContent = `${clickLeftYellow}, ${clickRightYellow}`;
}
```

* See [online version](https://imagecomputing.net/damien.rohmer/teaching/2017_2018/semester_2/CSE_104/online_exercices/B_javascript/05_code_structure/01_basic_code/), the source code is available in the directory `code/01_basic_code`

In this code, the four actions: left click on red box, right click on red box, left click on yellow box, right click on yellow box, are treated using four different functions.
All variables are declared globally and are all accessible in all the functions.

Note:
* `contextmenu` is a listener on the right-mouse click (the default behavior of the right click is to show the menu in your browser).
* `event.preventDefault()` allows to stop the default behavior of the event. In this case, not using this statement would result in the parameter menu from the right click to appear.


Although working, we can observe several issues with this code
* The four functions are almost a copy/paste one another. In working by copy/paste to write such function, there is a high probability to make errors (such as forgetting to update Red to Yellow, Left to Right, etc). As these functions look the same, they are hard to debug.
A better solution would consists in using a single action function taking some parameters.
* All 6 parameters are declared in the global scope. However, only three parameters are required in each individual function. If this program was much longer with higher number of parameters, it would quickly become uneasy to remember which parameter to modify in each function.


### Factorized, local variables, javascript code

* The first idea consists in avoiding the global variables. One way to start a program consists in defining a single entry point called the _main function_. 

```javascript
// Start of the program
main()

function main() {
  ... // describe the content of the program
}
```

* The four parameters storing the number of clicks can be grouped into two objects: clicks on the red box, and clicks on the yellow box. Each object storing its number of left and right clicks

```javascript
function main() {
  // Variables storing the number of clicks
  const clickRed    = {left:0, right:0};
  const clickYellow = {left:0, right:0};
  
  // The box associated to the listener
  const redBox    = document.querySelector('.left .box');
  const yellowBox = document.querySelector('.right .box');

  ...
}
```

* The other idea consists in factorizing the four different action functions into a single one. This single function could take as parameters: the current number of click and the increment to add on the left or on the right. The context indicating if the click occurs on the red or yellow box will be handled automatically by the event.

```javascript
// Only one generic action function
function actionClick(event, recordedClick, increment) {
  
  // update the recordedClick
  recordedClick.left  += increment.left;  //increment is an object being either {left:1, right:0}, or {left:0, right:1}
  recordedClick.right += increment.right;

  event.preventDefault(); // prevent default behavior in all cases: left and right click
  const element = event.currentTarget; // retrives the element on which the user clicked (red or yellow box)
  element.textContent = `${recordedClick.left}, ${recordedClick.right}`;
}
```

Note that the increment could be stored in many different ways, the presented one is only one possibility.

* The problem consists in connecting the action function to the listener on the box.
So far, the action function receives only one parameter: event. While we want to use the function `actionClick` with three parameters.

```javascript
// problem:
redBox.addEventListener('click', actionClick /* doesn't work: with this syntax, action click is supposed to receive only one argument: event */);
```

The JavaScript way to solve this problem consists to use a wrapper function using closure.

```javascript
// working code:
const actionClickLeftRed = function(event) { actionClick(event, clickRed, {left:1,right:0}); };
redBox.addEventListener('click', actionClickLeftRed);
```

Here the generic `actionClick` function with 3 parameters is wrapped into a specialized function with one visible parameter: `actionClickLeftRed`.
In calling `actionClickLeftRed(event)` the variables `clickRed` is _captured_ from the context function: it is called a closure.
This approach allows to add any arbitrary parameters to a function in wrapping a function into another one, and is heavily used for Callback functions in JavaScript.

* Finally, the complete code can be the following

```javascript
"use strict";

// Only one entry point: the main function
main();

function main() {

  // Variables storing the number of clicks
  const clickRed    = {left:0, right:0};
  const clickYellow = {left:0, right:0};  
  
  // The box associated to the listener
  const redBox    = document.querySelector('.left .box');
  const yellowBox = document.querySelector('.right .box');

  // Create wrapper to pass extra arguments to the action function
  const actionClickLeftRed     = function(event) { actionClick(event, clickRed,    {left:1,right:0}); };
  const actionClickRightRed    = function(event) { actionClick(event, clickRed,    {left:0,right:1}); };
  const actionClickLeftYellow  = function(event) { actionClick(event, clickYellow, {left:1,right:0}); };
  const actionClickRightYellow = function(event) { actionClick(event, clickYellow, {left:0,right:1}); };

  // Setup the listener
  redBox.addEventListener   ('click', actionClickLeftRed);
  redBox.addEventListener   ('contextmenu', actionClickRightRed);
  yellowBox.addEventListener('click', actionClickLeftYellow);
  yellowBox.addEventListener('contextmenu', actionClickRightYellow);

}

// Only one generic action function
function actionClick(event, recordedClick, increment) {
  
  // update the recordedClick
  recordedClick.left  += increment.left;
  recordedClick.right += increment.right;

  event.preventDefault();
  const element = event.currentTarget;
  element.textContent = `${recordedClick.left}, ${recordedClick.right}`;
}
```

* See [online version](https://imagecomputing.net/damien.rohmer/teaching/2017_2018/semester_2/CSE_104/online_exercices/B_javascript/05_code_structure/02_improved_version/), the source code is available in the directory `code/02_improved_version`

## General rules

As a general good practice rule :
* Try to avoid using global variables 
  * for this class: it is OK to use some, well identified, if it simplifies your program.
* Try to factorize as much as possible you code into common function
  * ex. One general function with parameters is better than four almost similar functions.
* Split your code into functions with clear and simple focus
  * Avoid creating long functions doing more than one action (ex. checking UI parameters, performing computation, updating the UI). Prefer calling several simpler functions: easier to understand, debug/maintain, and reuse.
