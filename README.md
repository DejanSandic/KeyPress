# KeyPress
Lightweight keyboard capturing library for use in development of Google Chrome extensions <br /><br />

## Description
This library will help you capture, and work with keyboard events just by using the names of the keys, instead of the key codes. <br />

KeyPress does not contain key mapping object. Instead, it relies on the "code" property, on the KeyboardEvent object in the Google Chrome.  <br />

Other browsers may not have the "code" property on the KeyboardEvent object, therefore there is no guarantee KeyPress will work on any other browser. <br /><br /><br />

## Installation
For testing purposes, you can link this library to your HTML via CDN:<br />
```html
<script src="http://cdn.dejansandic.com/js/KeyPress.js" type="text/javascript"></script>
```
Download <a href="http://cdn.dejansandic.com/js/KeyPress.js.zip">KeyPress.js</a> file for the production purposes.<br /><br /><br />

## How to use?
### How to know the name of the key?
KeyPress provides us with the helper function, which displays the information of the pressed key in the console of the Google Chrome.
Therefore, there is no need for blindly guessing the correct name of the key. <br /><br />

All we need to do is to run the function below at the beginning of our JavaScript file.
```js
  showKeys()
```
This function will now capture all of our key presses, and it will log the key information in the console. <br /><br />
For example, if we press the Enter key, KeyPress will log the next line to our console:
```sh
Enter key has been pressed. Key code: 13
```

### How to work with keyboard events?
KeyPress provides us with the simple `onKey` function used for capturing and reacting on keyboard events. <br />
This function takes 2 required arguments (name of the key, and the callback function), and one optional argument (delay). <br /><br />
Next function will log the "Hello world!" message to the console, 3 seconds after pressing the Spacebar.
```js
onKey('space', function(){
  console.log('Hello world!');
}, 3000);
```
Or inline with arrow function:
```js
onKey('space', () => console.log('Hello world!'), 3000);
```
NOTE -- Name of the key is not case sensitive, so any of these examples will work:
```js
onKey('space', () => console.log('Hello world!'), 3000);
onKey('SPACE', () => console.log('Hello world!'), 3000);
onKey('Space', () => console.log('Hello world!'), 3000);
onKey('sPaCe', () => console.log('Hello world!'), 3000);
```
### How to work with keyboard events, on a specific element?
Function `onKey` adds an event listener to our document. But what if we want to capture press of the Enter key only if the input field is selected at that moment? <br /><br />
KeyPress solves this issue by providing us with the `onElement`. This function takes the element as the argument, and then it returns `onKey` method which we then can use like in the previous example. <br /><br />
Next function will log the value of the input with the "myInput" id, after 3 seconds, only if Enter key is pressed while that input field is selected.
```html
<input type="text" id="myInput" />
```
```js
const myInput = document.getElementById('myInput');

onElement(myInput).onKey('enter', function(){
  console.log( myInput.value );
}, 3000);
```
### Key press direction
All functions above execute provided callback function on the press of the key on the keyboard. But what if we want to execute that function on the release of that key (key up)? <br /><br />
KeyPress got us covered again, with `onKeyUp` function, and `.onKeyUp` method. These work the same way as `onKey` function, and `.onKey` method.
```js
onKeyUp('space', () => console.log('Hello world!'), 3000);
```
```html
<input type="text" id="myInput" />
```
```js
const myInput = document.getElementById('myInput');

onElement(myInput).onKeyUp('enter', function(){
  console.log( myInput.value );
}, 3000);
```
# Happy coding ;-)