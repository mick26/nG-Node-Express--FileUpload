## Synopsis

File Upload App built using AngularJS (v1.3.0), NodeJS and ExpressJS(v4.1).
The Angular code is based on the [Egghead.io](http://ionicframework.com/) file upload tutorial.

I thought that File Uploads would be well covered with the Angular framework and Node
but I found it difficult to get suitable examples to work with.

There are alot of changes in Express v4.x compared to earlier versions.
Most of the Middleware has been omitted and if required needs to be included separately.
Some packages that were on the Node NPM repository have depracated and alternative packages must be used.

In Express 3.x you could use req.files to get access to the file(s) to upload. However this function is part of a 
third party middleware called 'formidable' which was used by another middleware called 'bodyParser'.
Both formidable and body-parser are still available on NPM. 

From reading stackoverflow the general advice I have come across is to [stay away from bodyParser](http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html) due to security issues around the tmp directory.
I have not looked into the details of this. The /tmp directory is the default upload location (unless another path is given).

Initially I got the upload working using req.files in Express v3.x and the server.js file is included.
However I then upgraded to ExpressJS version 4.1.

##Options

The 'body-parser' module only handles JSON and urlencoded data, not multipart which is the encoding type used by HTML to allow files to be embedded in HTML forms (which is needed when uploading files in this example). 

For multipart the following packages may enable file upload: 

* busboy 
* connect-busboy 
* formidable
* flow.js
* parted

With Express 4.1 I have not tried formidable, flowJS or parted and could not get busboy to work. However I got connect-busboy to work.   


##Left to Discover
This is just a basic file upload. I have come across 'imagemagick' and 'easyimage' (which uses imagemagick) image processing packages but have 
not got them working as yet. I would like to discover the definitive and most secure way of performing file uploads using Node and Angular. 

Some or all of the following  functionality may be useful: 
* client side validation - filter by MIME type & ensure integrity [FileAPI possibly](https://github.com/mailru/FileAPI)
* client side image processing possibly where the image size is altered and cropped before it is saved to the server. [FileAPI possibly]
* The server would also need to validate the image/source [Easyimage or Imagemagick or other method possibly]

I would like to get a clear example of best practice for this. 
I would also like to investigate connect-busman in more depth to check out the full functionality available from it. 


I have also got working with NodeJS (using almost the same server.js) an extremely good file upload package by [Daniel Farid](https://github.com/danialfarid/angular-file-upload). A working example of this shall also be available on my GitHub.

Daniel makes use of [FileAPI](https://github.com/mailru/FileAPI) for the image/file processing client side and has created what seems an excellent package.

## Motivation

Learning AngularJS and NodeJS. File uploading is functionality I require in a CRUD application that I am building. 

 
##Using the program
* Install Node and NPM
* run `npm install` (this installs all dependencies listed in project.json)
* run `node server.js`

A local express server will now be available on port 3030 [http://localhost:3030/]

##

Michael Cullen 2014