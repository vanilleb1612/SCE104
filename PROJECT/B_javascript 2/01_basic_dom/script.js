const element = document.querySelector(".parent")
for (var k = 0; k<element.children.length; k++) 
    if (k%2 ===0){
        element.children[k].style = "background-color:gray;"
}
    else {
        element.children[k].style = "background-color:white;"
    }