
const mongoose =require('mongoose')
const Schema =mongoose.Schema
const ejsSchema =new Schema({
    name:{
        type:String,
       
    },
    password:{
        type:String,
       
    },
    email:{
        type:String,
       
    },
    confirm_password:{
         type:String,
        
    }
  
})
module.exports=mongoose.model("Ejs",ejsSchema)