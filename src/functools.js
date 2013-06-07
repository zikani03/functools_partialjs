/** 
 * @author : zikani <boywonda1@gmail.com>
 * @date: 2013-06-02
 * @copyright  2013
 * Trying to implement Python's functools.partial in JavaScript
**/
var functools = {
 /** Create partial functions
 *
 * @param fn  : a function with n arguments
 * @param args: an object with (optional) parameters from fn as keys
 * @returns a function
 **/
   partial: function(fn, args){
      
      //get the function's signature.
      var re = new RegExp(/function\s*[a-zZ]*\(.*\)\s*{/);
      var fn_signature = (re.exec(fn.toString()))[0];

      //@array to store the function's parameters
      var params = [];
      
      // get the parameter names from the function's signature.
      var _raw = fn_signature.substr(fn_signature .indexOf("(")+1,fn_signature.length).replace(/\s*\)\s*{/,""); 

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
         //call the function                  
         return fn.apply(this,fparams);
      });
   } 
};

module.exports  = functools;

