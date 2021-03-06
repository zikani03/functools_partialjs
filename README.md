functools_partialjs
===================

Python's functools.partial() in JavaScript.


### Example Usage:


````javascript
	#!/usr/bin/env node
	var functools = require('functools');
	
	//using the log example from the python-docs
	var log = function (msg, subsystem){
		console.log(subsystem + ' : ' +  msg);
	}
	
	var server_log = functools.partial(log, {subsystem : 'server'});
	
	server_log('Unable to open socket');
	  
	// ofcourse, we can achieve what functools.partial does with a closure
	var server_log_closure = function(msg){
		return log(msg, 'server');
	}
	
	server_log_closure('Unable to open socket');
	
	var func1 = function(a, b, c){   return a + b + c;}; 
	
	var func2 = functools.partial(func1, { b : 4, c : 10 });
	console.log(func2(20));
	
	var func3 = functools.partial(func1, { a : 9});
	
	console.log(func3(20, 1)); // => 
	
	//works with anonymous functions too!
	var func4 = functools.partial( 
		function(x, y){
			return (x + y) * 3;
		}, {y : 5}
	);
	
	console.log(func4(3)); // => (3 + 5) * 3 => 24
````

inspired by
===========
Inspired by the partial function from [Python's functools module](http://docs.python.org/2/howto/functional.html)

License
===
MIT License

2014, zikani

