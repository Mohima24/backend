const jwt= require("jsonwebtoken")
require("dotenv").config()

const authenticate=(req,res,next)=>{
    const token = req.headers.authorization

    if(token){
        const decoded= jwt.verify(token,process.env.key)
        if(decoded){
            const userID =decoded.userID
            const userName = decoded.userName
            req.body.userID=userID
            req.body.userName=userName;
            next()
        }else{
            res.send("Please Logged in")
        }
    }else{
        res.send("Please login")
    }

}

module.exports={
    authenticate
}