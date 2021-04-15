"use strict";
var boxes= document.querySelectorAll('.boxe')
const newgame = document.querySelector(".newgame");
var res = 0 /* variable that will indicate who played in each boxe, 0 is X, 1 is O*/
const player1=document.querySelector(".player1");
const player2 =document.querySelector(".player2");
for (var x=0; x < 9; x++){
    boxes[x].addEventListener('click',boxeClicked);
    boxes[x].res = -1
}

function lines(){
    const line1= [boxes[0],boxes[1],boxes[2]]
    const line2=[boxes[3],boxes[4],boxes[5]]
    const line3=[boxes[6],boxes[7],boxes[8]]
    const column1=[boxes[0],boxes[3],boxes[6]]
    const column2 = [boxes[1],boxes[4],boxes[7]]
    const column3 = [boxes[2],boxes[5],boxes[8]]
    const diag1=[boxes[0],boxes[4],boxes[8]]
    const diag2=[boxes[2],boxes[4],boxes[6]]
    return [line1,line2,line3,column1,column2,column3,diag1,diag2]
}
function linestatus(line){
    var X = false
    var O = false
    var empty = false
    for(var x=0;x<3;x++){
        if(line[x].res==-1){
            empty = true
        }
        else if(line[x].res == 0){
            X = true
        }
        else{
            O = true
        }
    }
    if(empty){
        return('not done')
    }
    if(x && !O){
        return('x wins')
    }
    if(O && !X){
        return('o wins')
    }
    return('tie')
}

function boardstatus(){
    var num_ties = 0
    for(var x=0; x<lines().length;x++){
        const line = lines()[x]
        const stat = linestatus(line)
        if(stat=='x wins' || stat=='o wins'){
            return stat
        }
        if(stat=='tie'){
            num_ties +=1
        }
    }
    if(num_ties==8){
        return 'tie'
    }
    else{
        return 'not done'
    }
}
/*Function to determine what to do once a player has clicked on a boxe*/
function boxeClicked(event){
    newgame.classList.remove("inactive");
    newgame.addEventListener('click', actionClicknewgame);

    if(boardstatus()=='not done'){
        const image = document.createElement('img');
        /*Class turn will indicate whose turn it is, this function adds the image to the boxe clicked and changes turn, res will register who played in each turn*/
        if (player1.classList.contains("turn") & event.currentTarget.children.length<1){
            image.setAttribute('src', 'ticcross2.png');
            res = 1;
            player2.classList.add("turn");
            player1.classList.remove("turn");
        }    
        else if (player2.classList.contains("turn") & event.currentTarget.children.length<1){
            image.setAttribute('src', 'ticcircle.png')
            res = 0
            player1.classList.add("turn");
            player2.classList.remove("turn");
        }
        event.currentTarget.appendChild(image)
        event.currentTarget.res = Math.abs(res-1)
        if(boardstatus()=='x wins' || boardstatus()=='o wins' || boardstatus()=='tie'){
            document.getElementById('Winner').textContent+=boardstatus()
        }
    }
}
/*Like the bean game, this function resets the game by erasing the board and the result */
function actionClicknewgame(event) {
    res = 0 
    for (var x=0; x < 9; x++){
        boxes[x].res = -1
        boxes[x].textContent=''
   document.getElementById('Winner').textContent='Winner: '
    }
  const newgame = document.querySelector(".newgame");
  newgame.classList.add("inactive");
  newgame.removeEventListener('click', actionClicknewgame);
  player1.classList.add("turn");
  player2.classList.remove("turn");
}