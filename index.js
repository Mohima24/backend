const express = require("express")
const{connection} = require("./config/db")
const jwt = require("jsonwebtoken")
const cors = require("cors")
require("dotenv").config()

const {userRouter}= require("./routs/user.router")
const {animeRouter}=require("./routs/anime.router")
const {authenticate}= require("./middleware/authenticate")
const app= express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send("Index Page")
})

app.use('/user',userRouter)
app.use(authenticate)
app.use("/anime",animeRouter)

app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log(`Listening to http://localhost:${process.env.port}`)
    }
    catch(err){
        console.log(err)
        console.log("While connecting to mongoose")
    }
})
