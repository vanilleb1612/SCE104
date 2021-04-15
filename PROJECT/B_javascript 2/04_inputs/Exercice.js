const rectangle = document.querySelector('#rectangle') 
const button1 = document.querySelector('#button1')
const button2 = document.querySelector('#button2')
button1.value='white'
button2.value='white'
console.log(button2.value)
button2.addEventListener('input',colorchanged)
button1.addEventListener('input',colorchanged)
function colorchanged(event){
    console.log(button1.value)
    rectangle.style.background = `linear-gradient(${button1.value}, ${button2.value})`
}
const slider = document.querySelector('#slider')
slider.addEventListener('input',lengthchanged)
function lengthchanged(event){
    console.log(slider.value)
    rectangle.style.width = `${slider.value}%`
}