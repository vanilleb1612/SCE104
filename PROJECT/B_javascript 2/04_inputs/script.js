"use strict";

// Button
const button = document.querySelector("#button");
button.addEventListener('click',buttonClicked);

function buttonClicked(event) {
  console.log('clicked');
}

// Text entry
const textEntry = document.querySelector("#textEntry");
textEntry.addEventListener('change',textModified);

function textModified(event) {
  console.log('text modified into ',textEntry.value);
}