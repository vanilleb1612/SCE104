const radius = 50;  // Radius of the circle
let y = 0;          // height (/vertical) of the circle within the viewport
const circles = []
main();
console.log('')
function main() {
  document.addEventListener('click', createCircle);
}

function createCircle(event) {
  const x = event.clientX;
  y = event.clientY;
  new_circle = document.createElement("div")
  new_circle.y = y
  circles.push(new_circle)
  new_circle.classList.add('circle');
  new_circle.style.top = `${y-radius}px`;
  new_circle.style.left = `${x-radius}px`;
  document.querySelector('body').appendChild(new_circle)


  runAnimationLoop(y);

}
function runAnimationLoop() { 
  requestAnimationFrame (frame);
}

function frame(currentTime) {
  runAnimationLoop();
  for (var k = 0; k < circles.length; k++){
    circles[k].y += 5
    circles[k].style.top = `${circles[k].y-radius}px`
  }
}