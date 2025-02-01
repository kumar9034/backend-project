const express = require("express");
const path = require("path")
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extends:true})) 
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine','ejs')


app.get("/",function(req,res){
  fs.readdir("./files", function (err,files){
    res.render("index",{files:files});
  })
})
app.get("/files/:username",function(req,res){
  fs.readFile(`./files/${req.params.username}`, "utf-8", function(err, datafile){
    res.render('show', {filename: req.params.username, fileData:datafile} )

  })
  
})
app.get("/edit/:username",function(req,res){
  res.render('edit', {names: req.params.username})
  
})
app.post("/edit",function(req,res){
  fs.rename(`./files/${req.body.old}`,`./files/${req.body.new}`, function(err){
    res.redirect('/')
  })
  
  
})
app.post("/create",function(req,res){
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, function(err){
    res.redirect('/')
  })
})
app.listen(3000, function (){
  console.log("its running ")
});
 