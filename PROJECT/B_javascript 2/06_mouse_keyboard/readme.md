# Mouse and keyboard

We used so far JavaScript events to handle the mouse click (`click`) (as well as the right click (`contextmenu`)), and change of inputs in contextual GUI (`input`).
[Various other events](https://developer.mozilla.org/en-US/docs/Web/Events) can be used to trigger actions on your program.

## Keyboard

__Q.__ Create a program listening the following events: `keydown`, `keypress`, `keyup`. Print the triggered corresponding actions in command line. Observe the content of the event related to a keyboard event.

## Mouse

__Q.__ Create a program listening to the `mousemove` event. Observe that the event if fired continuously when you move the mouse. To what correspond the values `event.clientX` and `event.clientY`.

## Exercice

__Q.__ Create the following program such that
* A disc follows the mouse displacement on the screen at all time (the disc is centered on the mouse pointer).
* When pressing on `space` key, the disc changes its color from red, to yellow, and green.

![](pics/disc.apng)

Hint: 
* Translating an element can be performed using the [translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) property.


