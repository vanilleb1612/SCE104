let visible_pic = document.querySelector(".visible")
let invisible_pic = document.querySelector(".invisible")
visible_pic.addEventListener('click', actionClicked);
function actionClicked(event) {
    visible_pic.classList.remove("visible")
    invisible_pic.classList.remove("invisible")
    visible_pic.classList.add("invisible")
    invisible_pic.classList.add("visible")
    let x = visible_pic
    visible_pic = invisible_pic
    invisible_pic = x
    visible_pic.addEventListener('click', actionClicked);
}
