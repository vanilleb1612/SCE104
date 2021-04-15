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
