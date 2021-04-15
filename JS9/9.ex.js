const canvasElement = document.querySelector('canvas');
const ctx = canvasElement.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;


document.addEventListener('mousemove', mouseMoveAction);
document.addEventListener('keydown', keyDownAction);


function keyDownAction(event) {
    ctx.
    function mouseMoveAction(event) {

        if( event.keyCode == 13) {	  
          const T = colorTable.table;   
          const idx = colorTable.index;
      
          element.style.backgroundColor = T[idx];
          colorTable.index = (colorTable.index+1)%3;
        }
      }
      
  const x = event.clientX;
  const y = event.clientY;
  element.style.transform = `translate(${x-50}px, ${y-50}px)`;
}





