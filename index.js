const express = require("express")
const app = express();
const ejs=require('ejs')
const path = require("path")
const mongoose= require('mongoose')
const bodyparser=require('body-parser');
const User = require("./user");
const user = require("./user");
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyparser.json())
mongoose.connect("mongodb+srv://sanajy:hS4jcFuyzdFLWxiX@cluster0.xxkuqwq.mongodb.net/?retryWrites=true&w=majority",
{ useUnifiedTopology: true, useNewUrlParser: true }, () =>
 console.log(" connect"));
console.log(__dirname ,"public")
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
const port = 3000 
 app.get('/home',(req ,res)=>{
     res.render("home2.ejs")
 }) 
 app.get('/singup',(req ,res)=>{
    res.render("home.ejs")
}) 

 app.post('/singup', async(req ,res)=>{
    try{
      const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirm_password:req.body.password
      })
      console.log(user)
      const saveuser = await user.save();
      console.log(saveuser)
      res.render("login.ejs")
    }catch{
        res.status(500).json(err);
        console.log(err)
    }
}) 
//login
app.get("/login",(req ,res)=>{
  res.render("login.ejs")
})
app.get("/",(req ,res)=>{
  res.render("index.html")
})
app.get("/login",(req ,res)=>{
  res.render("login")
})
app.post("/login",async(req,res)=>{
  
  try{
    const user = await User.findOne({email: req.body.email});
   if(!user){
     res.status(401).json("Wrong credentials");
   }  
  const match =  bcrypt.compare(req.body.password, user.password);
   if (!match) {
     res.status(401).json("Wrong credentials");
   }
   res.render("home.ejs")
   
 }catch(err){
   res.status(500).json(err)
}
}
)

app.listen(port ,()=>{console.log("server is start")})