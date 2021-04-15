function getOffset(el) { /*Code from https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element */
    el = el.getBoundingClientRect();
    return {
      left: el.left + window.scrollX,
      top: el.top + window.scrollY
    }
  }
function getRandomInt(min, max) { /*Code from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range*/
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function timer(time){
    var milliseconds = 0
    var loop = setInterval(increment,1)
    function increment(){
        milliseconds = milliseconds+1
        if(milliseconds==time){
            console.log(milliseconds)
            clearInterval(loop)
        }
    }
    return loop
}
const snake = document.querySelector('#snake')
let apple = document.querySelector('#apple')
apple.x = getOffset(apple).left
apple.y = getOffset(apple).top
snake.direction = 'right'
var rect = snake.getBoundingClientRect()
snake.x = getOffset(snake).left
snake.y = getOffset(snake).top
let width = snake.offsetWidth
let height = snake.offsetHeight
const box  = document.querySelector('#playbox')
const boxwidth = box.offsetWidth
const boxheight = box.offsetHeight
document.addEventListener('keypress',keypressed)
function keypressed(event){
    if (event.key == 'ArrowUp') {snake.direction = 'up' }
    if (event.key == 'ArrowDown') {snake.direction = 'down'}
    if (event.key == 'ArrowLeft') {snake.direction = 'left'}
    if (event.key == 'ArrowRight') {snake.direction = 'right'}
}

function runAnimationLoop(){
    requestAnimationFrame(frame)
}

function frame(currentTime){
    if (snake.direction == 'right')
    {
        snake.x = (snake.x+width) % ( (box.offsetWidth-getOffset(box).left) - 0.5*snake.offsetWidth)
        snake.style.left = `${snake.x}px`
    }
    if (snake.direction == 'left')
    {
        snake.x = (snake.x-width) % (box.offsetWidth+12)

        if(snake.x<8){
            snake.x = box.getBoundingClientRect().right
        }    
        snake.style.left = `${snake.x}px`
    }
    if (snake.direction == 'down'){
        snake.y = (snake.y+height) % (box.offsetHeight+12)
        snake.style.top = `${snake.y}px`
    }
    if (snake.direction == 'up'){
        snake.y =(snake.y-height) % (box.offsetHeight+12)
        if(snake.y<8){
            snake.y = box.getBoundingClientRect().bottom
        }
        snake.style.top = `${snake.y}px`}
    if (Math.abs(snake.x - apple.x) <20 && Math.abs(snake.y-apple.y)<20 && box.children.length != 0){
        console.log('apple eaten')
        console.log(Math.abs(snake.x-apple.x))
        box.removeChild(apple)
        const new_x = getRandomInt(getOffset(box).left + 20, getOffset(box).left+ box.offsetWidth-20)
        console.log(new_x)  
        const new_y = getRandomInt(getOffset(box).top +20 , getOffset(box).top + box.offsetHeight-20)
        console.log(new_y)
        apple = document.createElement('div');
        apple.id = 'apple'
        apple.style.left = `${new_x}px`
        apple.style.top = `${new_y}px`
        box.appendChild(apple)
        apple.x = getOffset(apple).left
        apple.y = getOffset(apple).top
        
        }   
    runAnimationLoop()
    

}
runAnimationLoop()