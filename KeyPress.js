// KeyPress.js
// Created by Dejan Sandic github.com/DejanSandic

// IIFE which creates separate namespace for our code
(function(global){
	'use strict';//Run the next code in the strict mode

	// Define onKey function
	function onKey (key, callback, delay, element) {
		// If provided element is not an object set the document default value
		typeof element === 'object' ? element = element : element = document;

		// Throw an error if the first argument is not a string
		if (typeof key !== 'string') {
			throw 'First argument in onKey() function needs to be a string, '
			+ 'but you provided ' + (typeof key) + ' "' + key + '" instead.';
		}

		// Throw an error if the second argument is not a function
		if (typeof callback !== 'function') {
			throw 'Second argument in onKey() function needs to be a callback function, '
			+ 'but you provided ' + (typeof callback) + ' "' + callback + '" instead.';
		}

		// Throw an error if the third argument exists and it is not a number
		if (delay && typeof delay !== 'number') {
			throw 'Third argument in onKey() function needs to be a number which represents the delay, '
			+ 'but you provided ' + (typeof delay) + ' "' + delay + '" instead.';
		}


		// Add keypress listener to our event
		element.addEventListener('keypress', function(e) {
			// Check does event code matches our key argument
			if (key.toLowerCase() === e.code.toLowerCase()) {
				// If delay is specified create setTimeout() and call the
				// callback function with the provided timeout
				if(delay) {
					setTimeout(function(){
						callback(e.code, e.which);
					}, delay);
				// Else execute the function without the timeout
				} else {
					callback(e.code, e.which);
				}
			}
		});
	}

	// Define onElement function
	function onElement (element){
		// If element is not provided, set it to document
		element = element || document;
		// Return an object with one onKey method
		return {
			// Define a method which takes the same arguments as onKey function
			onKey: function (key, callback, delay) {
				// If delay is not set, set it to null
				delay = delay || null;
				// Invoke onKey function providing all 3 arguments from onKey method
				// and selected element as 4th argument
				onKey(key, callback, delay, element);
			}
		}
	};

	// Define onElement function which will add keypress event to a document
	function showKeys () {
		document.addEventListener('keypress', function(e){
			e.preventDefault();
			// Log code and charCode of the pressed key to the console 
			console.log( e.code + ' key has been pressed. Key code: ' + e.which)
			console.log(e)
		});
	}

	// Add the functions to the window object 
	global.onKey = onKey;
	global.onElement = onElement;
	global.showKeys = showKeys;
})(window);