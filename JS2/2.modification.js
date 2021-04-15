const title = document.querySelector('h1');
title.addEventListener('click',actionClicked);

function actionClicked(event) {
  // Create a new element
  const newElement = document.createElement('p');
  newElement.textContent = 'Clicked !';

  // Add new element in the DOM
  const article = document.querySelector('article');
  article.appendChild(newElement);
}