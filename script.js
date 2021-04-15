const element = document.querySelectorBUG(".hello_world");
element.textContent = "Hello World";

for(let k=0; k<20; k++) {
    element.textContent += "Hello World ";
}