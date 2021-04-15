const hoverdog = document.querySelector('img');
hoverdog.addEventListener('click',dogclicked);

function dogclicked(event) {
  const dog1 = document.querySelector('.imgdis');
  const dog2 = document.querySelector('.imghidden');

  dog1.classList.add("invisible");
  dog2.classList.remove("invisible");
}