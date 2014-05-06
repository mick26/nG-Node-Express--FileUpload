
/**
 * Module - for controllers
 */
angular.module('upApp.controllers', [] )

/**
* Controller - UploadCtrl
*/
/* ==================================================================
ng-model is not available for input type=file
Thus a directive is needed to gain access to the image file object in the 
controller i.e. imgFile.
*********************************************************************
Ref. https://developer.mozilla.org/en-US/docs/Web/Guide/Using_FormData_Objects
The FormData object lets you compile a set of key/value pairs to send 
using XMLHttpRequest. The transmitted data encoding is "multipart/form-data".
The FormData field's (key value pairs) value can be a Blob, File, or a string: 
if the value is neither a Blob nor a File, the value is converted to a string).
================================================================== */
.controller('UploadCtrl', function($scope, $http) {

    	$scope.filesChanged = function(elem) {
    		$scope.imgFiles=elem.files
    		$scope.$apply();
    	}
    	
        //upload function
        $scope.upload = function() {
            //Create FormData object
    		var fd = new FormData()
    		angular.forEach($scope.imgFiles, function(file) {
                //append fields to FormData 
    			fd.append('file', file)
    		})

            //override some Angular defaults and send it with a multipart/form-data request.
            $http.post('upload', fd, {	transformRequest:angular.identity,
          		                        headers:{'Content-Type':undefined}
          	                         })

            /* CALLBACK FUNCTIONS*/ 
            //Success with POST - file uploaded ok 
            .success(function(data, status, headers,config) {
                $scope.status = status;
                $scope.data = data;
                $scope.headers = headers;
                $scope.config = config;
            })
            //Error with POST
            .error(function(data, status, headers,config) {
                $scope.data = data || "Request failed";
                $scope.status = status;
            })
        }
    }
);