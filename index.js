require("dotenv").config();
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const cloudinary = require("cloudinary");
const db = require("./models");

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(express.static("static"));
cloudinary.config(process.env.CLOUDINARY_URL);

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", upload.single("myFile"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    db.cloudpic
      .findOrCreate({
        where: { url: result.url },
      })
      .then(() => {
        res.redirect("/show");
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  });
});

app.get("/show", (req, res) => {
  db.cloudpic
    .findAll()
    .then((myPics) => {
      res.render("show", { myPics });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
});

app.listen(3000);
