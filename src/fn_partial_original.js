/*
* author: zikani <boywonda1@gmail.com>
* date: 2013-06-02
* Trying to implement Python's functools.partial in JavaScript
* 
* TODO
* 1. Fix parameter substitution :: done-ish
* 2. Update Regex to include functions with _underscores_
*/

var functools = {
 /*
 * Create partial functions
 *
 * @param fn  : a function with n arguments
 * @param args: an object with (optional) parameters from f as keys
 * @return function
 */
   partial: function(fn, args){
      
      //get the function's signature.
      var re = new RegExp(/function\s*[a-zZ]*\(.*\)\s*{/);
      var fn_signature = (re.exec(fn.toString()))[0];

      //@array an array to store the function's parameters
      var params = [];
      
      // get the parameter names from the function's signature.
      var _raw = fn_signature .substr(fn_signature .indexOf("(")+1,fn_signature .length).replace(/\s*\)\s*{/,""); 

      //trim any trailing or leading spaces in the parameter names.
      _raw.split(",").forEach(function(item, index, array){
         item = item.replace(/\s?/,"");
         params.push(item);
      });

      //return a closure that encapsulates the fn     
      return (function(){
         
         //@array store the final parameter list
         var fparams = [];
         
         for(var i = 0; i < arguments.length; i++) 
            fparams.push(arguments[i]);
        
         params.forEach(function(item, index){
            
            
            if(fparams[index] && args[item]){
               var sub = fparams.slice(index);
               fparams[index] = args[item];
               fparams = fparams.concat(sub);
            }
            else if(args[item]){
               fparams[index] = args[item];
            }
         });
             
         //console.log(arguments);   
         //console.log(fparams);
         //call the function                  
         return fn.apply(this,fparams);
      });
   } 
};

var tests = {
   //using the log example from the python-docs
   mylog: function (msg, subsystem){console.log(subsystem + ' : ' +  msg);}
   
   ,run_all : function(){
   
      var server_log = functools.partial(this.mylog, {subsystem: 'server'});
      
      //assert(typeof(server_log), function);
      server_log('Unable to open socket');
      
      var func1 = function(a, b, c){   return a + b + c;};

      var func2 = functools.partial(func1,{b : " is that you", c: " Mr. Smith ?"});
      // we can now call func2 with the arguments we didn't specify
      console.log(func2("Hello,"));
      
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


