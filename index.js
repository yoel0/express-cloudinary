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
    var cloudID = result.public_id;
    console.log(cloudID);
    var image = "http://res.cloudinary.com/dhnwoivac/image/upload/c_fit,e_oil_paint:70,h_100,w_100/v1582003407/" + cloudID + ".png";
    console.log(image);
    res.render('image', { image: image });
  });
});




app.listen(3000);
