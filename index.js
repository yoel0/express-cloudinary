var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var multer = require('multer');


var app = express();
var uploads = multer({ dest: './uploads' });

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  // render a form for user to upload image
  res.render('index');
});

// post route decleration for home route ('/')
app.post('/', uploads.single('inputFile'), function(req, res) {
    console.log("POST Route hit ⚡️");
    
    // get input file from user
    var file = req.file;
    res.send(file);
})

// upload file to cloudinary
// return a rendered page w/ cloudinary link to formatted image


app.listen(4000);
