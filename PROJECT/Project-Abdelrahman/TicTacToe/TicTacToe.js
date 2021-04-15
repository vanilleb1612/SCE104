"use strict";
/*----------------------------------------------------------------------------------------------------------------*/

function getRandomInt(min, max) { /*Code from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range*/
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
/*----------------------------------------------------------------------------------------------------------------*/
/*This part is the front end section of the code */ 

/*I declare my global variables */
document.getElementById('reset').addEventListener('click',reset)
var twoplayer = document.getElementById('2player')
var easy = document.getElementById('Easy')
var hard = document.getElementById('Hard')
var boxes= document.querySelectorAll('.box')
var turn = 0 /*Global variable that indicates who's turn it is to play, 0 is x's turn, 1 is o's turn */

for (var i=0; i < 9; i++){
    boxes[i].addEventListener('click',boxClicked)
    boxes[i].turn = -1 /* I know this is confusing, but there is a global variable turn which indicates who's
                         turn it is to play, and each box has an attribute which is also called turn, but indicates
                         which player has played in the box, -1 means no one played, 0 means x played, 1 means o played */
}

function boxClicked(event){
    if(event.currentTarget.turn!=-1){
        /* Treat the case where the player clicks on a box which is not empty */
        return 
    }
    if(boardstatus()=='unfinished'){
        /* Add an x or an o depending on who's turn it is, and also update the box's .turn, then change the turn */
        const play = document.createElement('img')
        if (turn==0 & event.currentTarget.children.length<1){
            play.setAttribute('src', 'cross.png')
            turn = 1 
        }    
        else if (turn==1 & event.currentTarget.children.length<1){
            play.setAttribute('src', 'o.png')
            turn = 0
        }
        event.currentTarget.appendChild(play)
        event.currentTarget.turn = Math.abs(turn-1)
        if(boardstatus()=='x wins' || boardstatus()=='o wins' || boardstatus()=='tie'){
            document.getElementById('result').textContent+=boardstatus()
        }
        if(!twoplayer.checked){
            /* Compute a move*/
            setTimeout(computer,200)
            function computer(){
                if(boardstatus()=='unfinished'){
                    var computerplay
                    if (easy.checked){
                        /* Easy mode means the move will be computed randomly*/
                        computerplay = boxes[getrandomplay()]
                    }
                    else if(hard.checked){
                        /* Not so easy mode means the move will be computed as per heuristic evaluation*/
                        computerplay = getbestplay(getboard())
                    }
                    const play2 = document.createElement('img')
                    if (turn==0){
                        computerplay.turn = 0
                        play2.setAttribute('src','cross.png')
                        turn = 1
                    }
                    else if(turn==1){
                        computerplay.turn = 1
                        play2.setAttribute('src','o.png')
                        turn = 0
                    }
                computerplay.appendChild(play2)
                if(boardstatus()=='x wins' || boardstatus()=='o wins' || boardstatus()=='tie'){
                    document.getElementById('result').textContent+=boardstatus()
                }
                }
            }
        }
        
    }
}
function lines(){
    /* returns a hard-coded array of lines which I will use to check the status of the board */
    const line1= [boxes[0],boxes[1],boxes[2]]
    const line2=[boxes[3],boxes[4],boxes[5]]
    const line3=[boxes[6],boxes[7],boxes[8]]
    const column1=[boxes[0],boxes[3],boxes[6]]
    const column2 = [boxes[1],boxes[4],boxes[7]]
    const column3 = [boxes[2],boxes[5],boxes[8]]
    const diagonal1=[boxes[0],boxes[4],boxes[8]]
    const diagonal2=[boxes[2],boxes[4],boxes[6]]
    return [line1,line2,line3,column1,column2,column3,diagonal1,diagonal2]
}
function linestatus(line){
    /* return the status('x wins', 'o wins', 'tie' or 'unfinished) of a single line by counting the number 
    of x o's and empty cells */
    var x = false
    var o = false
    var empty = false
    for(var i=0;i<3;i++){
        if(line[i].turn==-1){
            empty = true
        }
        else if(line[i].turn == 0){
            x = true
        }
        else{
            o = true
        }
    }
    if(empty){
        return('unfinished')
    }
    if(x && !o){
        return('x wins')
    }
    if(o && !x){
        return('o wins')
    }
    return('tie')
}

function boardstatus(){
    /* Check the status of the board by checking the status of the lines */
    var num_ties = 0
    for(var i=0; i<lines().length;i++){
        const line = lines()[i]
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
        return 'unfinished'
    }
}

/*----------------------------------------------------------------------------------------------------------------*/
/* This part is all the backend part of the code, where the computer's move is computed */

function getrandomplay(){
    /* Very simple function that returns a legal random-move*/
    var play = getRandomInt(0,8)
    while (boxes[play].turn!=-1){
        play = getRandomInt(0,8)
    }
    return play
}

function getboard(){
    /* Convert the current board into a 2-dimensional array M where M[i][j] indicates the corresponding box's .turn */
    return[[[boxes[0].turn,boxes[1].turn,boxes[2].turn],[boxes[3].turn,boxes[4].turn,boxes[5].turn],[boxes[6].turn,boxes[7].turn,boxes[8].turn]],turn]
}
function getbox(){
    /* Convert the current board into a 2-dimensional array M where M[i][j] indicates the corresponding box */
    return [[boxes[0],boxes[1],boxes[2]],[boxes[3],boxes[4],boxes[5]],[boxes[6],boxes[7],boxes[8]]]
}
function getlines(matrix){
    /* Generate all the lines of a given matrix*/
    const l= []
    /* Get the rows */
    for(var row=0;row<3;row++){
        const foo = []
        for(var col=0;col<3;col++){
            foo.push(matrix[row][col])
        }
        l.push(foo)
    }
    /* Get the columns */
    for(var col=0;col<3;col++){
        const foo = []
        for(var row=0;row<3;row++){
            foo.push(matrix[row][col])
        }
        l.push(foo)
    }
    /* Get the diagonals*/
    l.push([matrix[0][0],matrix[1][1],matrix[2][2]],[matrix[0][2],matrix[1][1],matrix[2][0]])
    return l
}

function deepcopy(matrix){
    /* Make a deepcopy of a matrix,in order to allow me to make new boards */
    const foo = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    for(var row=0;row<3;row++){
        for(var col=0;col<3;col++){
            foo[row][col]=matrix[row][col]
        }
    }
    return foo
}

function play(board,i,j){
    /* Return a new board obtained by playing at position -ij on a given board */
    const matrix = deepcopy(board[0]) 
    var trn = board[1] /* If trn = 0, it means x will play, if trn=1, it means o will play */
    if(matrix[i][j]!=-1){
        return 'None'
    }
    matrix[i][j] = trn
    return[matrix,Math.abs(trn-1)]
}

function plays(board){
    /* Return an array of all the boards reachable from a given board */
    const ret = []
    for(var row=0;row<3;row++){
        for(var col=0; col<3;col++){
            if(play(board,row,col)!='None'){
                ret.push([[row,col],play(board,row,col)])
            }
        }
    }
    shuffle(ret)
    return ret
}

function linestat(board,line){
    /* Check the status of a line on a board */
    const trn = board[1]
    var x = false
    var o = false
    var empty = false
    for(var i=0;i<3;i++){
        if(line[i]==-1){
            empty = true
        }
        else if(line[i] == 0){
            x = true
        }
        else if(line[i]==1){
            o = true
        }
    }
    if(empty==true){
        return('unfinished')
    }
    if(x && !o){
        if(trn==0){
            return('win')
        }
        else{
            return('loss')
        }
    }
    if(o && !x){
        if(trn==1){
            return('win')
        }
        else{
            return('loss')
        }
    }
    return 'tie'
}

function status(board){
    /* Check the status of a board by checking the status of the lines */
    const matrix = board[0]
    const trn = board[1]
    const ls = getlines(matrix)
    var num_ties = 0
    for(var i=0; i<ls.length;i++){
        const l = ls[i]
        const stat = linestat(board,l)
        if(stat=='win' || stat=='loss'){
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
        return 'unfinished'
    }    
}
function heuristic_score(board){
    /* Compute the heuristic score of a given board based on the rules explained in the report */
    var stat = status(board)
    var trn = board[1]
    if(stat=='win'){
        console.log('bedrock')
        if(trn==0){
            return Number.MAX_SAFE_INTEGER
        }
        else{
            return -Number.MAX_SAFE_INTEGER
        }
    }
    if(stat=='loss'){
        console.log('bedrock')
        if(trn==0){
            return  -Number.MAX_SAFE_INTEGER
        }
        else{
            return Number.MAX_SAFE_INTEGER
        }
    }
    if(stat=='tie'){
            console.log('bedrock')
            return 0
    }
    var sc = 0
    var l = getlines(board[0])
    for(var i=0;i<l.length;i++){
        var liine = l[i]
        var num_x = 0
        var num_o = 0
        for(var j=0;j<liine.length;j++){
            if (liine[j]==0){
                num_x +=1
            }
            if (liine[j]==1){
                num_o +=1
            }
        }
        if(num_o == 0){
            sc += Math.pow(10,num_x)
        }
        if(num_x == 0){
            sc -= Math.pow(10,num_o)
        }
    }
    return sc
}

function score(board){
    /* Compute the score of a board based on the heuristic evaluation of its children.
    The return value is an array [score, move which allows you to reach that score]*/
    const stat = status(board)
    const trn = board[1]
    var pls = plays(board)
    if(trn==0){
        var sc = -Number.MAX_SAFE_INTEGER
    }
    if(trn==1){
        var sc = Number.MAX_SAFE_INTEGER
    }
    var mv = 'None'
    for(let i=0;i<pls.length;i++){
        const p = pls[i]
        const m = p[0]
        const b = p[1]
        const sc0 = sc
        const bsc = heuristic_score(b)
        if(trn==0){
            sc = Math.max(sc, bsc)
        }
        if(trn==1){
            sc = Math.min(sc,bsc)
        }
        if (sc0 !=sc || mv=="None"){
            mv = m
        }
    }
    return [sc,mv]
}

/* Alternative score function based on full game-tree exploration, which sadly did not work
function score2(board){
    const stat = status(board)
    const trn = board[1]
    if(stat=='win'){
        console.log('bedrock')
        if(trn==0){
            return [1,'None']
        }
        else{
            return[-1,'None']
        }
    }
    if(stat=='loss'){
        console.log('bedrock')
        if(trn==0){
            return [-1,'None']
        }
        else{
            return[1,'None']
        }
    }
    if(stat=='tie'){
            console.log('bedrock')
            return[0,'None']
    }
    pls = plays(board)
    if(trn==0){
        var sc = -1
    }
    if(trn==1){
        var sc = 1
    }
    var mv = 'None'
    for(let i=0;i<pls.length;i++){
        console.log(i)
        const p = pls[i]
        const m = p[0]
        const b = p[1]
        console.log(b,plays(b).length)
        const sc0 = sc
        const bsc = score(b)[0]
        if(trn==0){
            sc = Math.max(sc, bsc)
        }
        if(trn==1){
            sc = Math.min(sc,bsc)
        }
        if (sc0 !=sc || mv=="None"){
            mv = m
        }
    }
    return [sc,mv]
}
*/
function getbestplay(board){
    /* Get the move computed by score, and return it's corresponding div */
    const mv = score(board)[1]
    if(mv!='None'){
        return getbox()[mv[0]][mv[1]]
    }
}

function reset(){
    /* Reset the board and it's boxes. Called by the reset button */
    turn = 0 
    for (var i=0; i < 9; i++){
        boxes[i].turn = -1
        boxes[i].textContent=''
    }
    document.getElementById('result').textContent='Result: '
}