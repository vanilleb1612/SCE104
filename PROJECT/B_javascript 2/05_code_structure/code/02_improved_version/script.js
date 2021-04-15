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
