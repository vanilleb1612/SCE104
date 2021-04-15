const element = document.querySelector(".hello_world");
element.textContent = "Hello World";

for(var k=0; k<20; k++) {
	console.log("k=",k);
	element.textContent += "Hello World ";
}

// any variable can be printed in console
console.log(element.textContent);