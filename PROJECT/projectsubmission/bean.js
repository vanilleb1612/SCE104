"use strict";
// setting each button as a constent
const circle = document.querySelector('#circle1');
circle.addEventListener('click',actionClickedc);
const button1=document.querySelector('#button1');
const button2=document.querySelector('#button2')
const line = document.querySelector('#line1');
const option2c = document.querySelector('.option2c')
option2c.addEventListener('click',actionClickedc2)
const option2l = document.querySelector('.option2l')
const result = document.querySelector('.result');
const newgame = document.querySelector(".newgame");
const end= document.querySelector("#end")

let x=0
let r=[]

function actionClickedc(event) {
    // each turn, record in list r how many elements are in the results line
    r.push(0)
    console.log("r ="+ r)
    x = x+1
    console.log("x ="+ x)
    // Create a new element for boxe of game
    const newElement = document.createElement('div');
    newElement.classList.add('c');
  
    // Add new element in the boxe of game
    result.appendChild(newElement);
   
    // Activate button to start over a new game
    newgame.classList.remove("inactive");
    newgame.addEventListener('click', actionClicknewgame);
   // change effects on buttons to show whose turn it is
    button2.classList.remove("inactive");
    button1.classList.add("inactive");
    // activate second button and disable red button to allow second player to play
    line.addEventListener('click', actionClickedl);
    option2l.addEventListener('click', actionClickedl2)
    circle.removeEventListener('click', actionClickedc);
    option2c.removeEventListener('click', actionClickedc2);
    // once the length of the game is of 10 figures, end game
    if(x==10){
        const endphrase= document.createElement('p');
        endphrase.textContent="GAME OVER, RED WINS"
        end.appendChild(endphrase)
    }
}
//This function is exactly the same as the previous one, but it adds two red circles instead of one.
function actionClickedc2(event) {
    r.push(0)
    console.log("r ="+ r)
    x = x+2
    console.log("x ="+ x)
    // Create a new element
    const newElement = document.createElement('div');
    newElement.classList.add('c');
    const newElement1 = document.createElement('div');
    newElement1.classList.add('c');
    result.appendChild(newElement);
    result.appendChild(newElement1);
    newgame.classList.remove("inactive");
    newgame.addEventListener('click', actionClicknewgame);

    button2.classList.remove("inactive");
    button1.classList.add("inactive");
    line.addEventListener('click', actionClickedl);
    option2l.addEventListener('click', actionClickedl2)
    circle.removeEventListener('click', actionClickedc);
    option2c.removeEventListener('click', actionClickedc2);

    if(x==10){
        const endphrase= document.createElement('p');
        endphrase.textContent="GAME OVER, RED WINS";
        end.appendChild(endphrase);
    }
}
// This function is the same as actionClickedr, but with a blue rectangle
function actionClickedl(event) {
    r.push(1)
    console.log("r ="+ r)
    x = x+1
    console.log("x ="+ x)
    const newElement = document.createElement('div');
    newElement.classList.add('l');
    result.appendChild(newElement);

//    newgame.classList.remove("inactive");
  //  newgame.addEventListener('click', actionClicknewgame);
    button1.classList.remove("inactive");
    button2.classList.add("inactive");
    line.removeEventListener('click', actionClickedl);
    option2l.removeEventListener('click', actionClickedl2)
    circle.addEventListener('click', actionClickedc);
    option2c.addEventListener('click', actionClickedc2);

    if(x==10){
        const endphrase= document.createElement('p');
        endphrase.textContent="GAME OVER, BLUE WINS"
        end.appendChild(endphrase)
    }
}
// same function as actionClickedr2, but with two blue rectangles
function actionClickedl2(event) {
    r.push(1)
    console.log("r ="+ r)
    x = x+2
    console.log("x ="+ x)
    const newElement = document.createElement('div');
    newElement.classList.add('l');
    const newElement1 = document.createElement('div');
    newElement1.classList.add('l');
    result.appendChild(newElement);
    result.appendChild(newElement1);

//    newgame.classList.remove("inactive");  newgame.addEventListener('click', actionClicknewgame);
    button1.classList.remove("inactive");
    button2.classList.add("inactive");
    line.removeEventListener('click', actionClickedl);
    option2l.removeEventListener('click', actionClickedl2)
    circle.addEventListener('click', actionClickedc);
    option2c.addEventListener('click', actionClickedc2);

    if(x==10){
        const endphrase= document.createElement('p');
        endphrase.textContent="GAME OVER, BLUE WINS"
        end.appendChild(endphrase)
    }
}
// Thie function controls the button which resets the game
function actionClicknewgame(event) {
    x = 0
    console.log("x ="+ x)
  // Erase text result
  result.textContent = "";
  //reset the players' buttons
  line.removeEventListener('click', actionClickedl);
  option2l.removeEventListener('click', actionClickedl2)
  circle.addEventListener('click', actionClickedc);
  option2c.addEventListener('click', actionClickedc2);
  button1.classList.remove("inactive");
  button2.classList.remove("inactive");
  button2.classList.add("inactive");
  const endphrase = document.querySelector('#end p');
  end.removeChild(endphrase)
  // Disable cancel button
  const newgame = document.querySelector(".newgame");
  newgame.classList.add("inactive");
  newgame.removeEventListener('click', actionClicknewgame);
}