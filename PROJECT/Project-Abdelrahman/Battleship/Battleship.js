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

function grid(board){
    /* Function that makes a clickable grid out of a board by dividing it into a table of cells, and adds to
    each cell an x and y attribute indicating it's position in the table. It also initializes
    a .hit attribute which indicates if a cell has been hit or not. The  return value is a 2-dimensional array M
    where M[i][j] points to the cell at the i-th row and the j-th column.  */
    var matrix = []
    for(var r=0;r<10;r++){
        var row = board.appendChild(document.createElement('tr'))
        matrix.push([])
        row.classList.add('row')
        for (var c=0;c<10;c++){
            var box = row.appendChild(document.createElement('td'))
            box.boat = 'empty'
            box.hit = 'no'
            box.x = r
            box.y = c
            matrix[r].push(box)
            box.classList.add('cell')
        }
    }
    return matrix
}
/*----------------------------------------------------------------------------------------------------------------*/
/* Declaration of my global variables */
var myboard = document.getElementById('myboard')
var oppboard = document.getElementById('opponentboard')
var instructions = document.querySelector('#Instructions') /* Div containg the instructions of the game */
var show = document.getElementById('show') /* Checkbox to allow the teacher to see the opponent's boat for testing */
show.checked = false
var loop /* var for the main game loop */
var gamephase /* variable which allows me to navigate in the main game loop */
var currentboat /*Global variable indicating which boat must be placed */
var turn /* When turn = 0 it's the player's turn, when it's 1 it's the opponent's turn */
var previous /* Variable which is equal to 'none' if the opponent's previous shot was random and was a miss,
             or if he just sunk a boat, else it's equal to an array [cell that was hit, cross where the hit cell lies]
             if previous is none, the computer will play randomly, else it will compute a good followup shot */              
/*----------------------------------------------------------------------------------------------------------------*/
var matrix1 = grid(myboard) /* the 2-dimenstional array of the player's board*/
var cells = myboard.querySelectorAll('.cell') 
/* Every boat has an attribute size indicating how many blocks long it is, an attribute position which is an array
of the cells where it is placed (initially =[]), an attribute placed which is a boolean indicating whether 
the boat has been placed or not, an attribute next which is a pointer to another boat, which allows me to set the 
order in which the boats are placed, an attribute hits which is an array of the cells where the boat has taken a 
hit (initially =[]), an attribute sunk which is a boolean indicating if the boat has been sunk or not, and finally an
attribute string which determines the printed name of the ship
In this section I initialize the player's ships */
var destroyer = {size:2, positions:[],placed: false, next:'None',hits:[],sunk:false, string:'Destroyer'}
var submarine = {size:3, positions:[],placed: false,next:destroyer,hits:[],sunk:false, string: 'Submarine'}
var cruiser = {size:3, positions:[],placed:false, next:submarine,hits:[],sunk:false, string:'Cruiser'}
var battleship = {size:4, positions:[],placed:false,next:cruiser,hits:[],sunk:false, string:'Battleship'}
var carrier = {size:5, positions:[],placed:false,next :battleship,hits:[],sunk:false, string:'Carrier'}
var myfleet = [carrier,battleship,cruiser,submarine,destroyer]
/*----------------------------------------------------------------------------------------------------------------*/
/* In this section I initialize the opponents ships and board */
var matrix2 = grid(oppboard)
var opponentcells = oppboard.querySelectorAll('.cell')
var destroyer2 = {size:2, positions:[],placed: false, next:'None',hits:[],sunk:false, string:'Destroyer'}
var submarine2 = {size:3, positions:[],placed: false,next:destroyer2,hits:[],sunk:false, string:'Submarine'}
var cruiser2 = {size:3, positions:[],placed:false, next:submarine2,hits:[],sunk:false, string:'Cruiser'}
var battleship2 = {size:4, positions:[],placed:false,next:cruiser2,hits:[],sunk:false, string:'Battleship'}
var carrier2 = {size:5, positions:[],placed:false,next :battleship2,hits:[],sunk:false, string:'Carrier'}
var opponentfleet = [carrier2,battleship2,cruiser2,submarine2,destroyer2]

/*----------------------------------------------------------------------------------------------------------------*/
/* In this section I will define some usefull functions */
function orientation(boat){
    /* Function that returns the orientation of a placed boat, I only used it for debugging */
    if(boat.positions.length<2){
        return 'None'
    }
    else if(boat.positions[0].x == boat.positions[1].x){
        return 'y'
    }
    else if(boat.position[0].y == boat.positions[1].y){
        return 'x'
    }
    else{
        return 'BIG ERROR THE BOAT IS NOT STRAIGHT'
    }
}
function checkfleet(fleet){
    /* Function that returns true iff every boat in the fleet is sunk, else returns true */
    var num_sunk = 0
    for (var i=0; i<fleet.length;i++){
        if (fleet[i].sunk){
            num_sunk += 1
        }
    }
    if (num_sunk == fleet.length){
        return true
    }
    return false
}
function neighbours(cell,matrix){
    /* Function that returns the adjacent cells of a given cell, only used for debugging */
    function legal(x,y){
        return(x>-1 && x<10 && y>-1 && y<10)
    }
    ret = []
    if (legal(x-1,y)){
        ret.push(matrix[x-1][y])
    }
    if (legal(x+1,y)){
        ret.push(matrix[x+1][y])
    }
    if (legal(x,y-1)){
        ret.push(matrix[x][y-1])
    }
    if (legal(x,y+1)){
        ret.push(matrix[x][y+1])
    }
    
    shuffle(ret)
    return ret
}
function nonhitneighbours(cell,matrix){
    /* Function that returns the adjacent cells of a given cell iff they have not been hit, also only for debugging */
    ret = []
    var n = neighbours(cell,matrix)
    for (var i =0; i<n.length;i++){
        if(n[i].hit == 'no'){
            ret.push(n[i])
        }
    }
    return ret
}
function getcross(cell,matrix){
    /* Function that returns the cross where a cell lies on a matrix in the form of an array of arrays of cells
    that lie in a given direction of the cross (i.e left right up and down) */
    var x = cell.x
    var y = cell.y
    var left = []
    left.done = false
    for(var i=x-1;i>-1;i--){
        left.push(matrix[i][y])
    }
    var right = []
    right.done = false
    for(var i= x+1;i<10;i++){
        right.push(matrix[i][y])
    }
    var up = []
    up.done = false
    for (var j=y-1;j>-1;j--){
        up.push(matrix[x][j])
    }
    var down = []
    down.done = false
    for (var j=y+1;j<10;j++){
        down.push(matrix[x][j])
    }
    var ret = [left,right,up,down]
    shuffle(ret)
    return ret
}
function checklegalplace(cell,boat,orientation){
    /* Function that checks if placing the boat (by setting its left-most or upper- most cell) in a given cell 
    is legal or not */ 
    if (orientation=='vertical'){ 
        for(var x=cell.x;x<boat.size+cell.x;x++){
            if(x>9 || matrix1[x][cell.y].boat!='empty'){
                return false
            }
        }
        return true
    }
    if (orientation=='horizontal'){ 
        for(var y=cell.y;y<boat.size+cell.y;y++){
            if(y>9 || matrix1[cell.x][y].boat!='empty'){
                return false
            }
        }
        return true
}
}

/*----------------------------------------------------------------------------------------------------------------*/
/* In this section I will handle user events */
function cellClickedleft(event){
    /* Function that handles the user-event left click on the player grid, which indicates that a boat must 
    be placed there in the vertical direction */
    if(gamephase=='placing'){
        var orientation = 'vertical'
        if(checklegalplace(event.currentTarget,currentboat,orientation)){
            for(var x=event.currentTarget.x;x<currentboat.size+event.currentTarget.x;x++){
                matrix1[x][event.currentTarget.y].boat = currentboat
                matrix1[x][event.currentTarget.y].style.backgroundImage = "url('jaune.png')"
                currentboat.positions.push(matrix1[x][event.currentTarget.y])
            }
            currentboat.placed = true
        }
    }
}
function cellClickedright(event){
    /* Function that handles the user-event right click on the player grid, which indicates that a boat must 
    be placed there in the horizontal direction */
    event.preventDefault() /* Prevent the right click from opening the right click menu */
    if(gamephase=='placing'){
        var orientation = 'horizontal'
        if(checklegalplace(event.currentTarget,currentboat,orientation)){
            for(var y = event.currentTarget.y;y<currentboat.size+event.currentTarget.y;y++){
                matrix1[event.currentTarget.x][y].boat = currentboat
                matrix1[event.currentTarget.x][y].style.backgroundImage = "url('jaune.png')"
                currentboat.positions.push(matrix1[event.currentTarget.x][y])
            }
            currentboat.placed = true
        }
    }
}
function opponentCellclicked(event){
    /* Function that handles the user-event click on the player grid, which indicates that the clicked cell
    has been hit */
    var cellvalue = event.currentTarget.boat
    if(gamephase=='battle'){
        if(cellvalue=='empty'){
            event.currentTarget.hit = 'yes'
            event.currentTarget.style.backgroundImage = "url('lamerbleue.png')"
            event.currentTarget.boat = 'miss'
            turn =1 
        }
        else if(cellvalue=='miss' || event.currentTarget.hit=='yes'){
            return
        }
        else{
            event.currentTarget.hit = 'yes'
            var b = event.currentTarget.boat
            b.hits.push( event.currentTarget)
            event.currentTarget.style.backgroundImage = "url('orange.png')"
            if(b.hits.length==b.positions.length){
                for(var i = 0; i<b.positions.length;i++){
                    b.positions[i].style.backgroundImage = "url('lamerrouge.png')"
                }
                var p = document.createElement('p')
                p.textContent += `You sank your opponent's ${b.string}`  
                instructions.appendChild(p)
                b.sunk = true
            }
        }
    }
}
for (var i = 0 ; i<cells.length; i++){
    cells[i].addEventListener('click',cellClickedleft)
}
for (var i = 0 ; i<cells.length; i++){
    cells[i].addEventListener('contextmenu',cellClickedright)
}
for (var i = 0 ; i<opponentcells.length; i++){
    opponentcells[i].addEventListener('click',opponentCellclicked)
}
/*----------------------------------------------------------------------------------------------------------------*/
/* Main game loop */
function mainloop(){
/*----------------------------------------------------------------------------------------------------------------*/
    if (gamephase=='placing'){ /* In this part the player places his boats in the order specified by the boat.next attribute*/
        instructions.textContent =`Place your ${currentboat.string}. It's ${currentboat.size} blocks long. Left click to place it vertically, and right click to place it horizontally`
        if (currentboat.placed){
            if(currentboat.next!='None'){
                currentboat = currentboat.next
            }
            else if(currentboat.placed){
                /* The last boat was placed */
                currentboat = carrier2
                gamephase='opponentplacing'
                console.log(gamephase)
            }
        }
    }
/*----------------------------------------------------------------------------------------------------------------*/
    if (gamephase=='opponentplacing'){/* In this part the computer places its boats */
        instructions.textContent = ``
        function placeboat(cell,boat,orientation){
            /* Function which is very similar to cellclicked, it places a boat 
            with a given orientation in a given cell on the opponent board */ 
            if(orientation == 'vertical'){
                if(checklegalcellopponent(cell,boat,orientation)){
                    for(var x=cell.x;x<boat.size+cell.x;x++){
                        matrix2[x][cell.y].boat = boat
                        if (show.checked){
                            matrix2[x][cell.y].style.backgroundImage = "url('jaune.png')"
                        }
                            boat.positions.push(matrix2[x][cell.y])
                    }
                    boat.placed = true
                }
            }
            if(orientation == 'horizontal'){
                if(checklegalcellopponent(cell,boat,orientation)){
                    for(var y=cell.y;y<boat.size+cell.y;y++){
                        matrix2[cell.x][y].boat = boat
                        if (show.checked){
                            matrix2[cell.x][y].style.backgroundImage = "url('jaune.png')"
                        }
                        boat.positions.push(matrix2[cell.x][y])
                    }
                    boat.placed = true
                }
            }
        }
        function checklegalcellopponent(cell,boat,orientation){
            /* Function which is very similar to legalplace but it checks in the opponent's matrix*/
            if (orientation=='vertical'){ 
                for(var x=cell.x;x<boat.size+cell.x;x++){
                    if(x>9 || matrix2[x][cell.y].boat!='empty'){
                        return false
                    }
                }
                return true
            }
            if (orientation=='horizontal'){ 
                for(var y=cell.y;y<boat.size+cell.y;y++){
                    if(y>9 || matrix2[cell.x][y].boat!='empty'){
                        return false
                    }
                }
                return true
            }
        }
        function getlegalplay(boat){
            /*Function which returns a cell and an orientation for a given boat which are legal
            in the form of an array [cell,orientation] */
            var rand_x =  getRandomInt(0,8)
            var rand_y = getRandomInt(0,8)
            var cell = matrix2[rand_x][rand_y]
            var orientation
            var coin = Math.random()
            if(coin<0.5){
                orientation = 'horizontal'
            }
            else{
                orientation = 'vertical'
            }
            while (!checklegalcellopponent(cell,boat,orientation)){
                rand_x =  getRandomInt(0,8)
                rand_y = getRandomInt(0,8)
                cell = matrix2[rand_x][rand_y]
                coin = Math.random()
                if(coin<0.5){
                    orientation = 'horizontal'
                }
                else{
                    orientation = 'vertical'
                }
            }
            return [cell,orientation]
        }

        var move = getlegalplay(currentboat)
        placeboat(move[0],currentboat,move[1])
        /*Place all the boats : */
        if(currentboat.next!='None'){
            currentboat = currentboat.next
        }
        else if(currentboat.next='None'){
            /*The last boat has been placed, change the gamephase */
            turn = 0 /* Player goes first */
            previous='None' 
            gamephase = 'battle'
            instructions.textContent = "Battle ! Click on your opponent's grid to destroy his fleet and claim victory."
            console.log(gamephase)
        }
    }
/*----------------------------------------------------------------------------------------------------------------*/    
    if (gamephase=='battle'){
        /* In this phase, if turn is equal to 0, nothing of significance will happen in the loop untill the 
        player makes a move and sets the turn back to 1, in which case the computer computes a move*/ 
        if (checkfleet(myfleet)){
            /* If the player's fleet is destroyed, end the game */
            gamephase = 'Loss'
        }
        if (checkfleet(opponentfleet)){
            /* If the opponent's fleet is destroyed, end the game */
            gamephase = 'Win'
        }
        if (turn==1){
            /* It's the computer's turn */   
            function getrandomshot(){
                /* If previous is none, this function will be called to get a legal random shot */
                var rand_x =  getRandomInt(0,9)
                var rand_y = getRandomInt(0,9)   
                while(matrix1[rand_x][rand_y].hit=='yes'){
                    rand_x =  getRandomInt(0,9)
                    rand_y = getRandomInt(0,9) 
                }          
                return matrix1[rand_x][rand_y]
            }
            function randomplay(){
                /* If previous is none, this function will be called to play in a random cell fetched
                by getrandomshot */
                var cell = getrandomshot()
                if(cell.boat == 'empty'){
                    turn = 0
                    cell.boat = 'miss'
                    cell.hit ='yes'
                    cell.style.backgroundImage = "url('lamerbleue.png')"
                    previous = 'None'
                }
                else if(cell.boat == 'miss'|| cell.hit=='yes'){
                    return
                }
                else{
                    cell.hit = 'yes'
                    var b = cell.boat
                    b.hits.push(cell)
                    cell.style.backgroundImage = "url('orange.png')"
                    previous = [cell,getcross(cell,matrix1)]
                    if(b.positions.length == b.hits.length){
                        for(var i = 0; i<b.positions.length;i++){
                            b.positions[i].style.backgroundImage = "url('lamerrouge.png')"
                        }
                        var p = document.createElement('p')
                        p.textContent += `Your opponent sank your ${b.string}`  
                        instructions.appendChild(p)
                        b.sunk = true
                    }
                }
            }
            function followupshot(){
                /* If previous is not none this function will be called to compute a new target cell
                based on the previous one and the method described in the report */
                var cross = previous[1]
                var current_target_index = 0
                for (var i=0 ; i<cross.length;i++){
                    if(previous[1][i].length == 0){
                        previous[1][i].done = true
                    }
                }
                while (cross[current_target_index].done){
                    current_target_index = (current_target_index+1) % 4
                }
                var ret = cross[current_target_index][0]
                previous[1][current_target_index] = previous[1][current_target_index].slice(1)
                    return [ret,current_target_index]
            }
            function followupplay(){
                /* If previous is not none this function will be called play in a cell computed by
                followupshot*/
                var play = followupshot()
                var cell = play[0]
                var indx = play[1]
                if(cell.boat == 'empty'){
                    turn = 0
                    cell.boat = 'miss'
                    cell.hit = 'yes'
                    cell.style.backgroundImage = "url('lamerbleue.png')"
                    previous[1][indx].done = true
                }
                if(cell.boat.hit == 'yes' || cell.boat == 'miss'){
                    previous[1][indx].done = true
                    return
                }
                else{
                    cell.hit = 'yes'
                    var b = cell.boat
                    b.hits.push(cell)
                    cell.style.backgroundImage = "url('orangeaune.png')"
                    if(b.positions.length == b.hits.length){
                        for(var i = 0; i<b.positions.length;i++){
                            b.positions[i].style.backgroundImage = "url('lamerrouge.png')"
                        previous = 'None'
                        }
                        var p = document.createElement('p')
                        p.textContent += `Your opponent sank your ${b.string}`  
                        instructions.appendChild(p)
                        b.sunk = true
                    }
                }
            }
            if (previous=='None'){
                randomplay()
            }
            else{
                followupplay()
            }
        }
    }
    if (gamephase == 'Win'){
        /*instructions.children = []*/
        while(instructions.children.length == 0){
            instructions.children.remove(instructions.children[0])
        }
        instructions.textContent = 'Congratulations, you win ! Press restart to play again'
        console.log('Win')
        clearInterval(loop)
    }
    if (gamephase == 'Loss'){
        /*instructions.children = [] */
        while(instructions.children.length == 0){
            instructions.children.remove(instructions.children[0])
        }
        instructions.textContent = 'You lost, better luck next time ! Press restart to play again'
        console.log('Loss')
        clearInterval(loop)
    }
}

function init(event){
    /* Initial call for mainloop() which initializes all the variables, called by the start button */
    gamephase = 'placing'
    console.log(gamephase)
    currentboat = carrier
    loop  = setInterval(mainloop,50)
    document.querySelector('#start').disabled = true
    document.querySelector('#start').classList.add('disabled')
    document.querySelector('#start').classList.remove('enabled')
    document.querySelector('#restart').disabled = false
    document.querySelector('#restart').classList.remove('disabled')
    document.querySelector('#restart').classList.add('enabled')
}

document.querySelector('#start').addEventListener('click',init)
document.querySelector('#restart').addEventListener('click',restart)
document.querySelector('#restart').disabled = true

function restart(){
    /* Reset the boards and the boats, called by the restart button */
    clearInterval(loop)
    for (var i = 0; i<10; i++){
        for (var j = 0; j<10; j++){
            matrix1[i][j].boat = 'empty'
            matrix1[i][j].hit = 'no'
            matrix1[i][j].style.background = 'whitesmoke'
            matrix2[i][j].boat = 'empty'
            matrix2[i][j].hit = 'no'
            matrix2[i][j].style.background = 'whitesmoke'
        }
    }
    destroyer = {size:2, positions:[],placed: false, next:'None',hits:[],sunk:false, string:'Destroyer'}
    submarine = {size:3, positions:[],placed: false,next:destroyer,hits:[],sunk:false, string: 'Submarine'}
    cruiser = {size:3, positions:[],placed:false, next:submarine,hits:[],sunk:false, string:'Cruiser'}
    battleship = {size:4, positions:[],placed:false,next:cruiser,hits:[],sunk:false, string:'Battleship'}
    carrier = {size:5, positions:[],placed:false,next :battleship,hits:[],sunk:false, string:'Carrier'}
    destroyer2 = {size:2, positions:[],placed: false, next:'None',hits:[],sunk:false, string:'Destroyer'}
    submarine2 = {size:3, positions:[],placed: false,next:destroyer2,hits:[],sunk:false, string:'Submarine'}
    cruiser2 = {size:3, positions:[],placed:false, next:submarine2,hits:[],sunk:false, string:'Cruiser'}
    battleship2 = {size:4, positions:[],placed:false,next:cruiser2,hits:[],sunk:false, string:'Battleship'}
    carrier2 = {size:5, positions:[],placed:false,next :battleship2,hits:[],sunk:false, string:'Carrier'}
    myfleet = [carrier,battleship,cruiser,submarine,destroyer]
    opponentfleet = [carrier2,battleship2,cruiser2,submarine2,destroyer2]
    gamephase = 'placing'
    console.log(gamephase)
    currentboat = carrier
    loop  = setInterval(mainloop,50)
}    


