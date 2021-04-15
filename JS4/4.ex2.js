const m = document.querySelector('img');
m.addEventListener('click',actionClicked1);
const di = document.querySelector('span');

function actionClicked1(event) {
    const ne = document.createElement('p');
    ne.textContent = `You clicked on a, `;
    di.appendChild(ne);
}
const ne = document.createElement('p');
const b = document.querySelector('.button');
b.addEventListener('click',actionClicked);

function actionClicked(event) {
    di.remove(ne);
}