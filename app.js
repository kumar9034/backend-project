const express = require('express')
const app = express()
const path = require('path')
const usermodel = require('./models/user')


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))


// app.get('/',(req, res)=>{
//     res.send('hey')
// })
app.get('/',(req, res)=>{
    res.render('index')
})
app.get('/read', async (req, res)=>{
   let userdata = await usermodel.find()
    res.render('read', {user:userdata})
})
app.get('/delete/:id', async (req, res)=>{
   let userdata = await usermodel.findOneAndDelete({_id: req.params.id })
    res.redirect('/read')
})
app.get('/edit/:userid', async (req, res)=>{
   let user = await usermodel.findOne({_id: req.params.userid })
    res.render('edit', {user})
})
app.post('/update/:userid', async (req, res)=>{
    let {name, email, image}= req.body
   let user = await usermodel.findOneAndUpdate({_id: req.params.userid }, {name,email,image},{new:true})
    res.redirect('/read')
})
app.post('/create',async (req, res)=>{
    let {name, email, image} = req.body
    let createuser = await usermodel.create({
        name,
        email,
        image
    })
    res.redirect("/read");
})



app.listen(3000); 