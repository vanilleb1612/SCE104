# GUI and buttons

We call `widget` a graphical element which can interact with the user. Buttons, checkbox, text entry, etc. are common widgets.

HTML describes a set of basic widgets using the [input tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) that can be used "as it is" with default behavior set for contact forms. However, the behavior of these widget may be finely adapted to your needs using JavaScript.


* Consider the following code

```html
<input id="button" type="button" value="click me"> <br>
Type some text: <input id="textEntry" type="text">
```

```javascript
"use strict";

// Button
const button = document.querySelector("#button");
button.addEventListener('click',buttonClicked);

function buttonClicked(event) {
  console.log('clicked');
}

// Text entry
const textEntry = document.querySelector("#textEntry");
textEntry.addEventListener('change',textModified);

function textModified(event) {
  console.log('text modified into ',textEntry.value);
}
```

* Check the console when you click on the button, or write some text in the corresponding widget.

* Adapt the code such that the message `You typed the following text: ${TEXT}` appears when the user click on the button, where `${TEXT}` corresponds to the content of the text widget.


## Exercise: Color Gradient

__Q.__ Create the code allowing to parameterize the extreme color of a rectangular box, as well as its length, as seen in the following example

![](pics/exercise.apng)


_Hints_: 
* Widget allowing color selection and slider can be set using the `color` and `range` type.
* The event `input` is called every time the value of the widget is modified.




