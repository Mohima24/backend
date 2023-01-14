const mongoose = require("mongoose")

const animeSchema = mongoose.Schema({
    name:String,
    rating:Number,
    image:String,
    creater:String,
    userID:String,
    userName:String
},{
    versionKey:false
})

const Animemodel = mongoose.model("anime",animeSchema)

module.exports={
    Animemodel
}