const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    pass:String
},{
    versionKey:false
})

const Usermodel = mongoose.model("user",userSchema)

module.exports={
    Usermodel
}