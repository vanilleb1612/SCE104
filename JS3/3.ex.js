const clicksquare = document.querySelector('.click_square');
clicksquare.addEventListener('click',actionClickedsquare);

function actionClickedsquare(event) {
    const Csquare = document.querySelector('div');
    Csquare.classList.remove("circle");
    Csquare.classList.add("square");

}


const clickcircle = document.querySelector('.click_circle');
clickcircle.addEventListener('click',actionClickedcircle);

function actionClickedcircle(event) {
    const Circle = document.querySelector('div');
    Circle.classList.remove("square");
    Circle.classList.add("circle");

}

const clickyellow = document.querySelector('.click_yellow');
clickyellow.addEventListener('click',actionClickedyellow);

function actionClickedyellow(event) {
    const yellow = document.querySelector('div');
    yellow.classList.remove("red");
    yellow.classList.add("yellow");
}

const clickred = document.querySelector('.click_red');
clickred.addEventListener('click',actionClickedred);

function actionClickedred(event) {
    const red = document.querySelector('div');
    red.classList.remove("yellow");
    red.classList.add("red");
}