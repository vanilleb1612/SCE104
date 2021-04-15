runAnimationLoop();

// Animation Loop
function runAnimationLoop() {
  requestAnimationFrame( frame );
}

// The current Frame
function frame(currentTime) {
  console.log(currentTime);
  runAnimationLoop();
}