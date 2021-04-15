# Animation Loop

Let us consider you want to animate a result through time - typically evolving even when the user doesn't interact directly with it. Animation consists in repetitively calling a function that print/compute/draws the currently visualized results. Such repetition is called an _animation loop_.

Each static view of a single call from an animation loop is called a _Frame_. The animation loop should be able to update and draw the result at least 25 times per seconds in order to have the feeling of a continuous animation. The number of drawing per seconds is usually called _Frames Per Seconds_, or _fps_. A continous animation should therefore run, at least, at 25fps, or in order words, the computation of each frame should not exceed 40ms.

Our screen have typically a refreshing rate of about 60fps. It is therefore useless to draw the results more often.

## requestAnimationFrame

JavaScript proposes the built-in function [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) allowing to handle an animation loop in calling itself repetitively.

* requestAnimationFrame takes as argument a user defined function. This function is called automatically as soon as the system is ready, and synchronize to the refreshing rate of your system.
* The user defined function receives automatically, as parameter, the current amount of time elapsed since the beginning of the loop at a precision of 1ms.

__Q.__ Create an empty screen program with the following JS code

```javascript
runAnimationLoop();

// Animation Loop
function runAnimationLoop() {
  requestAnimationFrame( frame );
}

// The current Frame
function frame(currentTime) {
  console.log(currentTime);
  runAnimationLoop();
}
```

* Observe the printed value on the console. This value indicates the currentTime elapsed since the beginning of the loop.
* Note that the function drawing the current frame should itself call repetidetly _runAnimationLoop_, and thus _requesAnimationFrame_.
* requestAnimationFrame automatically handle the synchronisation with the system, ensuring it is ready to draw the next frame.

## Interaction and animation

Let us consider we want to model the following behavior, where a disc appears when and where the user click, and then falls down.


![](pics/animation.apng)


Let us first start with a single disc.

* Create the following code making a disc appearing at the position of the user click (no animation yet).

```html
<body>
	<div class="circle"></div>
</body>
```

```css
.circle {
  background-color:cyan; 
  width: 100px; 
  height: 100px; 
  position: fixed; 
  border-radius: 50%;
}
```

```javascript
const radius = 50;  // Radius of the circle
let y = 0;          // height (/vertical) of the circle within the viewport
let circleElement = document.querySelector('.circle');

main();

function main() {
  document.addEventListener('click', createCircle);
}

function createCircle(event) {
  const x = event.clientX;
  y = event.clientY;
  circleElement.style.top = `${y-radius}px`;
  circleElement.style.left = `${x-radius}px`;
}
```

__Q.__ Create an animation in making the _y_ value increasing from a constant value at each frame. Then applying this new _y_ value to the style of _circleElement_.
(Note that your disc will instantaneously translate to a new position when the user clicks.)

__Q.__ Extend your code in handling an arbitrary number of discs. A new disc should appear for each user click.

_Hints_ :
  * You can use an array, initialy empty, to store the disc element, and their _y_ position. 
  * Every time the user click, a new disc is created and inserted in the array and in the DOM.
  * At every frame, all the _y_ position of all the discs are updated.


__Q.__ Extension: Delete discs that are outside of the viewport (that you cannot see anymore) to limit the size of your DOM and the array storing all the elements.