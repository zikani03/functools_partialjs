functools_partialjs
===================

Python's functools.partial() in JavaScript.

### Notes:

- First ever successful weekend project!!

- Got the idea while reading through python docs on functional programming
  
- made it a node module too. ( how do i add it to npm ?)

- I am still a wack programmer so please help me and tell me how i can improve this

### Example Usage:

````javascript
      #!/usr/bin/env node
      var functools = require('functools');
      //using the log example from the python-docs
      
      var log = function (msg, subsystem){console.log(subsystem + ' : ' +  msg);}
   
      var server_log = functools.partial(log, {subsystem: 'server'});
      
      server_log('Unable to open socket');
      
      var func1 = function(a, b, c){   return a + b + c;}; 
      
      var func2 = functools.partial(func1,{b: 4, c: 10});
      console.log(func2(20));
      
      var func3 = functools.partial(func1,{a: 9});
      console.log(func3(20, 1));
      
      //works with anonymous functions too!
      var func4 = functools.partial(function(x,y){ return (x + y) * 3;}, {y : 5});
      console.log(func4(3));
````

inspired by
===========
Inspired by the partial function from [Python's functools module](http://docs.python.org/2/howto/functional.html)

2013, zikani

