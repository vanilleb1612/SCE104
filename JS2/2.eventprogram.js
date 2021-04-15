const title = document.querySelector("h1");
title.addEventListener('click',actionClicked);

function actionClicked(event) {
  console.log('clicked');
  title.textContent=("clicked")
}