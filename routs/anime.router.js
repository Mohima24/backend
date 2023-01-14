const express = require("express");
const {Animemodel}= require('../models/anime.model')
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { json } = require("express");
require("dotenv").config()

const animeRouter = express.Router() ;

animeRouter.get("/all",async(req,res)=>{
    const userName = req.body.userName
    const animeData = await Animemodel.find()
    const js= JSON.stringify(userName)
    res.send(animeData)
})

animeRouter.post("/post",async(req,res)=>{
    const {name,rating,image,creater,userID,userName}=req.body;
    const anime = new Animemodel({name,rating,image,creater,userID,userName})
    await anime.save()
    res.send("user has been added anime")
})
animeRouter.patch("/edit/:id",async(req,res)=>{
    let paramid=req.params.id;
    let data = await Animemodel.findOne({_id:paramid});
    let reqUser= req.body.userID;
    if(data){
        let userID = data.userID;
        if(reqUser==userID){
            await Animemodel.findByIdAndUpdate({_id:paramid})
            res.send("Data has beend edited")
        }else{
            res.send("It's belongs to else's user")
        }
    }else{
        res.send("No Data available in this anime id")
    }
})

animeRouter.put("/edit/:id",async(req,res)=>{
    let paramid=req.params.id;
    let data = await Animemodel.findOne({_id:paramid});
    let reqUser= req.body.userID;
    if(data){
        let userID = data.userID;
        if(reqUser==userID){
            await Animemodel.findOneAndReplace({_id:paramid})
            res.send("Data has beend replaced")
        }else{
            res.send("It's belongs to else's user")
        }
    }else{
        res.send("No Data available in this anime id")
    }
})

animeRouter.delete("/delete/:id",async(req,res)=>{
    let paramid=req.params.id;
    let data = await Animemodel.findOne({_id:paramid});
    let reqUser= req.body.userID;
    if(data){
        let userID = data.userID;
        if(reqUser==userID){
            await Animemodel.findByIdAndDelete({_id:paramid})
            res.send("Data has beend deleted")
        }else{
            res.send("It's belongs to else's user")
        }
    }else{
        res.send("No Data available in this anime id")
    }
})


module.exports={
    animeRouter
}

// {
//     "name":"Death Note",
//     "rating":9.0,
//     "image":"https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
//     "creater":"Tsugumi Ohba"
// }