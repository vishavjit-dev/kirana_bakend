const mongoose=require('mongoose')

const add_category=new mongoose.Schema({
 
    category_name:{type:String},
    category_image:{type:Array},
   
    
    },{timestamps:true})

const addcategory=mongoose.model('add_category',add_category)
module.exports=addcategory