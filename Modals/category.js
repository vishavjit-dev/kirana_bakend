const mongoose=require('mongoose')

const add_category=new mongoose.Schema({
    // product_code:{type:String},
    // product_category:{type:String},
    // product_type:{type:String},
    category_name:{type:String},
    // product_sku:{type:String},
    // product_price:{type:String},
    // product_description:{type:String},
    category_image:{type:Array},
    // product_discount:{type:String},
    // product_benefits:{type:Array},
    // product_quantity1:{type:Number}
   
    
    },{timestamps:true})

const addcategory=mongoose.model('add_category',add_category)
module.exports=addcategory