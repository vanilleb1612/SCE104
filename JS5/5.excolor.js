const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const slider = document.querySelector("#length");

button1.addEventListener('input',buttoncolorClicked);
button2.addEventListener('input',buttoncolorClicked);
slider.addEventListener('input',lengthchanged);

function buttoncolorClicked(event) {
  const color1 = button1.value;
  const color2 = button2.value;

  const boxe = document.querySelector('#boxe');
  boxe.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

function lengthchanged(event) {
  const length = slider.value;
  const boxe = document.querySelector('#boxe');
  boxe.style.width = length+'%';
}
