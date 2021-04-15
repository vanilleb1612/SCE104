const textEntry = document.querySelector("#textEntry");
textEntry.addEventListener('change',textModified);

function textModified(event) {
  const textRender = document.querySelector("#textRender");
  textRender.innerHTML = textEntry.value
}