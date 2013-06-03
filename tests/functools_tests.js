#!/usr/bin/env node
var functools = require('../src/functools');

var tests = {
   //using the log example from the python-howto-docs
   mylog: function (msg, subsystem){console.log(subsystem + ' : ' +  msg);}
   
   ,run_all : function(){
   
      var server_log = functools.partial(this.mylog, {subsystem: 'server'});
      
      //assert(typeof(server_log), function);
      server_log('Unable to open socket');
      
      var func1 = function(a, b, c){   return a + b + c;};

      var func2 = functools.partial(func1,{b : " is that you", c: " Mr. Smith ?"});
      // we can now call func2 with the arguments we didn't specify
      console.log(func2("Hello,")); // same as func1 ( "Hello," , "is that you", " Mr. Smith ?")
      
      var func21 = functools.partial(func1,{b : " is that you"});
      // we can now call func2 with the arguments we didn't specify
      console.log(func21("Hello,", " Mr Stark?"));
      
      
      var func3 = functools.partial(func1,{b: 4, c: 10});
      console.log(func3(20));
      
      var func31 = functools.partial(func1,{a: 9});
      console.log(func31(20, 1));
      
      //sorta works with anonymous functions too!
      var func4 = functools.partial(function(x,y){ return (x + y) * 3;}, {y : 5});
      console.log(func4(3));
      
      //combos!
      var func5 = functools.partial(func1, {a : func4(3), b: func31(20,1)});
      
      console.log(func5(1));
      
   }
};

// we can achieve what functools.partial does with a closure
using_a_closure = function(){
   server_log = function(msg){
      return tests.mylog(msg, 'server');
   }
server_log('Unable to open socket');
}

console.log('\n--------Using a Closure-----------\n');
using_a_closure();

console.log('\n--------Using functools.partial -----------\n');
tests.run_all();


