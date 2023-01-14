const express = require("express");
const {Usermodel}= require('../models/user.model')
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const userRouter = express.Router() ;

userRouter.get("/",(req,res)=>{
    const token = req.headers.authorization;
    jwt.verify(token, 'anime',(err, decoded)=> {
        if(decoded){
            res.send("data")
        }else{
            res.send(err)
        }
    })
    // console.log(token)
})

userRouter.post("/register",async(req,res)=>{
    const {name,age,email,pass}=req.body;
    try{
        bcrypt.hash(pass, 5, async(err, securepass)=> {
            if(err){
                console.log(err)
                res.send("error while register data")
            }else{
                const user = await Usermodel({name,age,email,pass:securepass})
                await user.save()
                res.send("user has been register")
            }
        })
    }
    catch(err){
    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await Usermodel.find({email});
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass,(err, result) => {
                if(result){
                    const token = jwt.sign({"userID": user[0]._id,"userName":user[0].name}, process.env.key,{ expiresIn: "1h" })
                    res.send({"msg":"logIn Successfully","token":token})
                }else{
                    res.send("Wrong credentials")
                }
            })
            
        }else{
            res.send("Wrong credential")
        }
    }
    catch(err){
        res.send("Somethings went wrong while login")
        console.log(err)
    }
})

module.exports={
    userRouter
}



// {
//     "name":"Amit Bahadur",
//     "email":"amitbahadur@gmail.com",
//     "pass":"mohima",
//     "age":27
// }