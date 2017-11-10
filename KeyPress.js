// KeyPress.js
// Created by Dejan Sandic github.com/DejanSandic

// Creating IIFE which creates separate namespace for our code.
(function(global){
	'use strict';//Run the next code in the strict mode.

	// Define onKey function.
	global.onKey = function (key, callback, delay, element, direction) {
		// If provided element is not an object, set the document default value.
		typeof element === 'object' ? element = element : element = document;
		// If direction argument is not provided, keypress is set as default.
		direction = direction || 'keypress';

		// Throw an error if the first argument is not a string.
		if (typeof key !== 'string') {
			throw 'First argument in onKey() function needs to be a string, '
			+ 'but you provided ' + (typeof key) + ' "' + key + '" instead.';
		}

		// Throw an error if the second argument is not a function.
		if (typeof callback !== 'function') {
			throw 'Second argument in onKey() function needs to be a callback function, '
			+ 'but you provided ' + (typeof callback) + ' "' + callback + '" instead.';
		}

		// Throw an error if the third argument exists and it is not a number.
		if (delay && typeof delay !== 'number') {
			throw 'Third argument in onKey() function needs to be a number which represents the delay, '
			+ 'but you provided ' + (typeof delay) + ' "' + delay + '" instead.';
		}


		// Add keypress listener to our event.
		element.addEventListener(direction, function(e) {
			// Check does event code matches our key argument.
			if (key.toLowerCase() === e.code.toLowerCase()) {
				// If delay is specified, create setTimeout() and call the
				// callback function with the provided timeout.
				if(delay) {
					setTimeout(function(){
						callback(e.code, e.which);
					}, delay);
				// Otherwise, execute the function without the timeout.
				} else {
					callback(e.code, e.which);
				}
			}
		});
	}

	global.onKeyUp = function (key, callback, delay) {
		// If delay is not set, set it to null.
		delay = delay || null;
		onKey(key, callback, delay, document, 'keyup');
	}

	// Define onElement function.
	global.onElement = function (element){
		// If element is not provided, set it to "document".
		element = element || document;
		// Return an object with methods.
		return {
			// Define a method which takes the same arguments as onKey function,
			// and runs a callback function on the key press.
			onKey: function (key, callback, delay) {
				// If delay is not set, set it to null.
				delay = delay || null;
				// Invoke onKey function providing all 3 arguments from onKey method,
				// and selected element as 4th argument.
				onKey(key, callback, delay, element);
			},

			// Define a method which takes the same arguments as onKey function,
			// and runs a callback function on the release of the key.
			onKeyUp: function (key, callback, delay) {
				// If delay is not set, set it to null.
				delay = delay || null;
				// Invoke onKey function providing all 3 arguments from onKey method,
				// and selected element as 4th argument.
				onKey(key, callback, delay, element, 'keyup');
			}
		}
	};

	// Define onElement function which will add keypress event to a document.
	global.showKeys = function () {
		document.addEventListener('keypress', function(e){
			e.preventDefault();
			// Log code and charCode of the pressed key to the console .
			console.log( e.code + ' key has been pressed. Key code: ' + e.which)
			console.log(e)
		});
	}

// Set "global" variable to the window object.
})(window);