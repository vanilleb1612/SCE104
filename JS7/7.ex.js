const element = document.querySelector('.disc');
const colorTable = {table:['red','yellow','green'], index:0}; 

document.addEventListener('mousemove', mouseMoveAction);
document.addEventListener('keydown', keyDownAction);


function mouseMoveAction(event) {
  const x = event.clientX;
  const y = event.clientY;
  element.style.transform = `translate(${x-50}px, ${y-50}px)`;
}

function keyDownAction(event) {

  if( event.keyCode == 13) {	  
    const T = colorTable.table;   
    const idx = colorTable.index;

    element.style.backgroundColor = T[idx];
    colorTable.index = (colorTable.index+1)%3;
  }
}



