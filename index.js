require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
var cloudinary = require('cloudinary');

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', upload.single('inputFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    res.send(result);
  });
});




app.listen(3000);
