"use strict";
function getRandomInt(min, max) { /*Code from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range*/
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* In this section I declare all the global variables */

var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')
var scorecanvas = document.getElementById('score')
var scorectx = scorecanvas.getContext('2d')
var snakeSize = 20
var width = canvas.width
var height = canvas.height
var score 
var snake /* The snake is just an array of positions, where each position is an array [x,y]*/
var actual_direction 
var direction_to_set /* I needed to use two variables to fetch the direction because of a problem I explain in the report*/
var apple /* The food for the snake is just reporesented by an array [x,y] that denote it's position */
var loop  /* The  main game loop is a global variable in order to allow me to stop it when the player loses */
var gameover /* Boolean indicating whether the player has lost or not */ 
var headX /* The X position of the head of the snake */
var headY /* The Y position of the head of the snake */
var button = document.getElementById('start')
button.addEventListener("click", init)

/* In this section I take care of adding options in order to make testing the game easier :) */
var teachermode= document.getElementById('Teacher-Mode')
teachermode.checked = false
var godmode = document.getElementById('godmode')
godmode.checked = false
var speedslider = document.getElementById('speed')
speedslider.value = 60
teachermode.addEventListener('click',teacherclicked)
function teacherclicked(){
    options = document.getElementById('options')
    if (teachermode.checked == true){
        options.classList.remove('invisible')
    }
    else if(teachermode.checked == false){
        options.classList.add('invisible')    
    }
}



function initsnake(){
    /* Function to initialize the snake's positions and it's direction*/
    var length = 4 /* The snake starts with 4 blocks */
    snake = []
    for (var i = length;i>=0; i--){
        snake.push([i,0])
    actual_direction = 'right'
    direction_to_set = 'right'
    }
}
/* In this section I take care of user input, again the reason why I use two variables
for direcetion is explained in the report */
document.addEventListener('keypress',keypressed)
function keypressed(event){
if (event.key == 'ArrowUp' && actual_direction != 'down') {direction_to_set = 'up' }
if (event.key == 'ArrowDown' && actual_direction != 'up') {direction_to_set = 'down'}
if (event.key == 'ArrowLeft' && actual_direction != 'right') {direction_to_set = 'left'}
if (event.key == 'ArrowRight' && actual_direction != 'left') {direction_to_set = 'right'}
}

function drawsquare(x,y,color,bordercolor){
        /* Function that draws a square on my canvas at any given x-y position*/
        ctx.fillStyle = color
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize)
        ctx.strokeStyle = bordercolor
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize)
    }
function printscore(){
        /* Function to print the score */
        scorectx.font="20px Arial"
        scorectx.fillText(`Score: ${score} ` ,20,20)
    }
function moveSnake(){
    /* Function that updates the snake's position as a function of the direction which is a global variable */
    if (actual_direction=='down'){
        headY +=1
        if(headY>Math.floor(height/snakeSize)-1){
            headY= 0
        }
    }
    if (actual_direction=='up'){
        headY -=1
        if(headY < 0){
            headY = Math.floor(height/snakeSize)-1
        }
    }
    if (actual_direction=='left'){
        headX-=1
        if(headX < 0){
            headX = Math.floor(width/snakeSize)-1
        }
    }
    if (actual_direction=='right'){
        headX+=1
        if(headX>Math.floor(width/snakeSize)-1){
            headX = 0
        }
    }
    snake[0][0] = headX
    snake[0][1]= headY
}
function checkcollision(){
    /* Function that check if the snake has 'eaten' himself. This is done by checking if the position
    of the head coincides with any other position on the snake */
    if(godmode.checked){ /* Never lose if godmode is on */
        return false
    }
    for(var i = 1; i<snake.length; i++){
        if(snake[i][0] == headX && snake[i][1]== headY){
            return true
        }
    }
    return false
}
function newapple(){
    /* Function that updates the variable apple by generating random coordinates. If the chosen coordinates 
    coincide with a position in the snake, generate new coordinates*/
    var applex = getRandomInt(1,Math.floor(width/snakeSize)-1)
    var appley = getRandomInt(1,Math.floor(height/snakeSize)-1)
    function check_in_snake(){
        for (var i =0; i<snake.length; i++){
            var snakex = snake[i][0]
            var snakey = snake[i][1]
            if(applex == snakex && snakey==appley){
                return true
            }
        }
        return false
    }
    while(check_in_snake()){
        applex = getRandomInt(1,Math.floor(width/snakeSize)-1)
        appley = getRandomInt(1,Math.floor(height/snakeSize)-1)
    }
    apple = [applex,appley]
}
function gameloop(){
    /* Main loop where the game happens */
    if (!gameover){
        actual_direction = direction_to_set /* update the directions */
        ctx.clearRect(0,0,canvas.width,canvas.height)
        scorectx.clearRect(0, 0, canvas.width, canvas.height)/* clear the board to refresh the frame */
        moveSnake() /* Update the snake's position */
        /* Update the game state : */ 
        if(checkcollision()){ 
            gameover = true
        }
        if (headX == apple[0] && headY == apple[1]) {
            /* Treat the case where the snake eats the apple by adding a new block where the head is */ 
            var tail = [[headX][headY]]
            score++
            newapple()
        }
        else{
            /*Treat the case where the snake does not eat the apple by just shifting the tail of the snake to 
            the beggining */
            var tail = snake.pop()
            tail.x = headX
            tail.y = headY
        }
        snake.unshift(tail)
        for(var i = 1; i < snake.length; i++) {
            /* Draw the snake except for the head*/ 
            drawsquare(snake[i][0], snake[i][1],'rgb(89, 113, 11)','rgb(100, 133, 30)')
        }
        if (gameover){
            /* Indicate the collision with a red block */
            drawsquare(headX, headY,'rgb(177, 48, 41)','rgb(100, 133, 30)')
        }
        else{
            /* Draw the head of the snake*/
            drawsquare(headX, headY,'rgb(89, 113, 11)','rgb(100, 133, 30)')
        }
        drawsquare(apple[0],apple[1],'rgb(183, 71, 92)','rgb(109, 7, 27)') /*Draw the apple */
        printscore() /* Update the score board */
    }
    else{
        /* If the player has lost*/
        console.log('game over')
        scorectx.font="20px Impact"
        scorectx.fillText(`Game over!!!` ,40,60)
        scorectx.font="10px Arial"
        scorectx.fillText(`Press start to play again` ,40,80)
        clearInterval(loop) /* Stop the game loop */
        button.classList.remove('disabled') 
        button.classList.add('enabled')
        button.disabled= false /*Enable the start button again */
    }
}
    
function init(){
    /* Initial call for gameloop() which initializes all the variables */
    gameover = false 
    score = 0
    button.classList.add('disabled') 
    button.classList.remove('enabled')
    button.disabled= true /*Disable the start button */ 
    initsnake() 
    newapple()
    headX = snake[0][0]
    headY = snake[0][1]
    /* Start the loop, the tick on setInterval indicates the refresh rate of the canvas, and therefore the 
    speed of the snake, which can be adjusted using the slider */
    loop = setInterval(gameloop, 100-speedslider.value) 

}
