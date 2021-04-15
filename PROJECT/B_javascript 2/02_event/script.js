const title = document.querySelector('h1');
title.addEventListener('click',actionClicked);

function actionClicked(event) {

  
  const element = document.querySelector('div');
  element.classList.remove("square");
  element.classList.add("circle");
}