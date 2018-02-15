require('dotenv').config();
var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
var cloudinary = require('cloudinary');
// var fs = require('fs');

app.set('view engine', 'ejs');

// create this after you have seen the response format in #2
// var images =[]


//***************************1***************************

app.get('/', function(req, res) {
  res.render('index');
});


// "upload" is multer saving that file to a dir called uploads
app.post('/', upload.single('myFile'), function(req, res) {
  // this sends req.file (courtesy of multer) to the browser
  res.send(req.file);
});



//***************************2***************************

// app.get('/', function(req, res) {
//   res.render('index');
// });


// to see what comes back in the result
// app.post('/', upload.single('myFile'), function(req, res) {
//   cloudinary.uploader.upload(req.file.path, function(result) {
//     res.send(result);
//   });
// });


//***************************3***************************

// app.get('/', function(req, res) {
//   res.render('index', {images, cloudinary});
// });

//add results to an array, redirect to the root, send array with it
// app.post('/', upload.single('myFile'), function(req, res) {
//   cloudinary.uploader.upload(req.file.path, function(result) {
//     images.push(result.public_id);
//     res.redirect('/');
//   });
// });


// html for index to display the images
// <% images.forEach(function(image){ %>
//   <% var imgUrl = cloudinary.url(image, { width: 150, height: 150 }); %>
//   <img src="<%= imgUrl %>">
// <% }) %>




//****EXTRA****
// if they want to then delete the file from uploads
// app.post('/', upload.single('myFile'), function(req, res){
//   cloudinary.uploader.upload(req.file.path, function(result){
//     images.push(result.public_id);
//     //now delete all the files in the upload folder
//     fs.readdir('./uploads', function(err, items) {
//     items.forEach(function(file) {
//         fs.unlink('./uploads/' + file);
//       });
//     });
//     //now take me to the root
//     res.redirect('/');
//   });
// });





app.listen(3000);
