/*=========================================================
Michael Cullen
File Upload
April 2014
Working

Ref.
Uploading
Egghead.io - file upload example
http://stackoverflow.com/questions/21128451/express-cant-upload-file-req-files-is-undefined
http://www.hacksparrow.com/handle-file-uploads-in-express-node-js.html/comment-page-4#comment-9306
https://github.com/danialfarid/angular-file-upload/blob/master/README.md

body-parser - not required with file upload Express 4.x
is a piece of express middleware that reads a form's input and 
stores it as a javascript object accessible through `req.body` 
Dependencies: type-is, raw-body, qs.

Express
http://expressjs.com/guide.html
============================================================*/

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express = require('express');			//Express Web Server 
//var bodyParser = require('body-parser');	//connects bodyParsing middleware
var path = require('path');					//used for file path
var fs =require('fs-extra');				//File System - for file manipulation
											//needed for renaming file etc

/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express();

/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(path.join(__dirname, 'public')));

/* ========================================================== 
 bodyParser() required to allow Express to see the uploaded files
 Additionaly I changed the directory for the file uploads to ./img
 from the default which is /tmp here
============================================================ */
app.use(express.bodyParser( { uploadDir:'./img' } ));

/**
* Another method is: 
* app.use(express.bodyParser( { uploadDir:path.join(__dirname,'/files')} ));
*/

/* ========================================================== 
Create a Route (/upload) to handle the Form submission 
(handle POST requests to /upload)
============================================================ */
// Express v3 route definition
app.post('/upload', function (req, res, next) {

	/* ========================================================== 
	req.files contains details of uploaded file(s)
	Can access file from req.files.
	============================================================ */
	var files = req.files.file;
	console.log("===============================================" );
	console.log("req.files.file.name= " + req.params.file.name );
	console.log("req.params.file.size= " + req.params.file.size );
	console.log("req.params.file.type= " + req.params.file.type );
	console.log("req.params.file.path= " + req.params.file.path );
	console.log("===============files===========================" );  
//	console.log(files);
	console.log("===============================================" );


	/* ========================================================== 
	We now have uploaded the file(s) to the ./img directory
	PROBLEM - The file names have been changed with the upload
	SOLUTION - Rename file to desired name. Unlink the original path 
	============================================================ */

	var tmp_path = req.files.file.path;					// initial file path (including name) ./img/randomName
	var target_path = './img/' + req.files.file.name; 	// set the required path and file name .img/correctName

	// move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;

        // delete the initial uploaded file
        fs.unlink(tmp_path, function() {
            if (err) throw err;

            //Response 
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
        });
    });
});

/* ========================================================== 
Bind to a port and listen for connections on it 
============================================================ */
var server = app.listen(3030, function() {
	console.log('Listening on port %d', server.address().port);
});