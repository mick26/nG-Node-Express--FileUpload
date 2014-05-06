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
http://runnable.com/U0sU598vXio2uD-1/example-reading-form-input-with-express-4-0-and-body-parser-for-node-js
http://expressjs-book.com/forums/topic/replacement-for-bodyparser-connect-multipart/

Express 4.x
http://stackoverflow.com/questions/23114374/file-uploading-with-express-4-0-req-files-undefined
http://expressjs.com/guide.html
https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x

The 'body-parser' module only handles JSON and urlencoded form submissions, 
not multipart (which would be the case if you're uploading files).
For multipart, you'd need to use something like busboy or formidable 
(formidable is what was originally used in the express bodyParser middleware). 

connect-busboy =>used this middleware for file upload
https://github.com/mscdex/connect-busboy

Multer=>middleware for handling multipart/form-data. Written on top of busboy
https://github.com/expressjs/multer

Reformed
https://github.com/mscdex/reformed -- 

Image Processing
http://www.hacksparrow.com/node-js-image-processing-and-manipulation.html
http://stackoverflow.com/questions/12582652/resizing-images-using-imagemagick-in-node-js?rq=1
============================================================*/


/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express = require('express');			//Express Web Server 
var busboy = require('connect-busboy');		//middleware for form/file upload
//var im = require('imagemagick');
//var easyimg = require('easyimage');			//image processing
var path = require('path');					//used for file path
var fs = require('fs-extra');				//File System - for file manipulation
//var http = require('http');

/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express();

/* ========================================================== 
Use busboy middleware
============================================================ */
app.use(busboy());

/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(path.join(__dirname, 'public')));


/* ========================================================== 
Create a Route (/upload) to handle the Form submission 
(handle POST requests to /upload)
Express v4  Route definition
============================================================ */

app.route('/upload')
	.post(function (req, res, next) {

	    var fstream;
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) {
	        console.log("Uploading: " + filename);

	        //Path where image will be uploaded
	        fstream = fs.createWriteStream(__dirname + '/img/' + filename);
	        file.pipe(fstream);

	        fstream.on('close', function () {
	        	//With multiple file upload need to remove res.redirect 
	        	//and only call it once at the end. (I think)
	            console.log("Upload Finished of " + filename);
	            
	            res.redirect('back');				//where to go next
	        });
	    });
	});


/* ========================================================== 
Bind to a port and listen for connections on it 
============================================================ */
var server = app.listen(3030, function() {
	console.log('Listening on port %d', server.address().port);
});


