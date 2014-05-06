
/**
 * Directives Module
 */
angular.module('upApp.directives', [] )


/* =====================================================================
Ref.
Mastering WAD with nG Book. P291
https://docs.angularjs.org/api/ng/service/$parse
http://www.youtube.com/watch?v=ZXI9Jdl0QQs
http://odetocode.com/blogs/scott/archive/2013/07/05/a-file-input-directive-for-angularjs.aspx
http://stackoverflow.com/questions/12994710/in-angularjs-how-to-access-the-element-that-triggered-the-event
http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
$parse service - converts ng expression into a function
http://www.youtube.com/watch?v=ZXI9Jdl0QQs

Angular propogates changes from the DOM to the model through DOM 
event listeners registered by the directives. 
The event listener function then mutates the model by updating 
variables exposed to the $scope.

$parse service - converts ng expression into a function
This expression: 
var modelGetter = $parse(attrs.fileInput);
converted to this function: 
var modelGetter = function(attrs) { return attrs.fileInput };
====================================================================== */

//Inject in the $parse service
//$parse service converts an expression into a function 
.directive('fileInput', function($parse) {

    /*
    use the link option to create a directive that manipulates the DOM.
    Link option - provide local functionality for the directive element. It’s
    better to use link when we use scope.$watch() or when we’re doing any interaction with the
    live scope of the DOM.
    */
    return {
        //The directive will appear as a HTML5 Attribute 'A' "file-input" attached to 
        //an html Input Element
    	restrict:'A',

        //Link directive to scope
        //Link fn is passed a parameter element which is a JQ (Lite) object that 
        //references the DOM element where the directive is an attribute of 
        //(DOM Element is <input>) 
    	link:function(scope, element, attrs) {

            //to get access to an element that triggered an event bind() to the desired event:
            //manipulate the DOM in here
            //element.bind()  using JQLite

            var modelGetter = $parse(attrs.fileInput);
            var modelSetter = modelGetter.assign;

            //Monitor the DOM input element for changes (a 'change' event)
            element.bind('change', function() {
                
                //alert('change on ' + element);        //**TEST** change on[[Object HTMLInputElement]]
                scope.$apply(function() {
                    var value = element[0].files;       //selected file(s)
                    modelSetter(scope, value);          //move selected file(s) into the model.
                });
            });

        }
    };
})


/*
console.log("elm[0].files= " +elm[0].files);						//TEST
console.log("elm[0].files[0]= " +elm[0].files[0]);					//TEST
console.log("elm[0].files[0].size= " +elm[0].files[0].size);		//TEST
console.log("elm[0].files[0].name= " +elm[0].files[0].name);		//TEST
console.log("elm[0].files[0].type= " +elm[0].files[0].type);		//TEST
*/

