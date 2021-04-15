const redboxe = document.querySelector('.red');
redboxe.addEventListener('click',actionClicked1);

function actionClicked1(event) {
    const newElement1 = document.createElement('p');
    newElement1.textContent = 'Red !';

    const article = document.querySelector('article');
    article.appendChild(newElement1);
}

const yellowboxe = document.querySelector('.yellow');
yellowboxe.addEventListener('click',actionClicked2);

function actionClicked2(event) {
    const newElement2 = document.createElement('p');
    newElement2.textContent = 'Yellow !';

    const article = document.querySelector('article');
    article.appendChild(newElement2);
}