const body = document.querySelector("body");

const circles = [];
const radius = 50; 

document.addEventListener('click',createcircle);
requestAnimationFrame(frameRun);


function createcircle(event){
    const x0 = event.clientX;
    const y0 = event.clientY;
  
    const circleElement = document.createElement("div");
    circleElement.classList.add('circle');
    circleElement.style = `top:${y0 - radius}px; left:${x0 - radius}px;`;
  
    body.appendChild(circleElement);
  
    // Store this circle and its y coordinate in an array
    circles.push({ element: circleElement, y: y0 - radius });

}


function frameRun(currentTime) {

  // Translate all circles in y direction
  for (let k=0; k<circles.length; k++) {
    const e = circles[k];
    e.y = e.y + 3;
    e.element.style.top = `${e.y}px`;
  }

  // Remove useless discs
  for(let k=0; k<circles.length; k++) {
    const e = circles[k];
    if( e.y>800 ) // Assume that window will not be heigher than 800px (could use viewport instead)
    {
      body.removeChild(e.element);
      circles.splice(k,1);	// Slice removes existing elements at a specific position k. The second parameter of splice is the number of elements to remove
    }
  }


  requestAnimationFrame(frameRun);
}