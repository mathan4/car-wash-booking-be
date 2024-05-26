const jwt = require('jsonwebtoken')
const JWT_TOKEN = "shasunfgASDFqweyfhiugrvFASDGivjhbaiyehfuqjgkjkbwihiuAASG"
const userModel=require('../models/userModel')


const verifyToken= async (request,response,next)=>{
    const token= await request.header('Authorization').replace('Bearer','').trim()
    
    if(!token){
        return response.status(401).send({message:"Access Denied"})
    }
    try {
        const verified=jwt.verify(token,JWT_TOKEN)
        request.user=verified

        next()
    } catch (error) {
        return response.status(500).send({message:error.message})
    }
}

const isAdmin= async (request,response,next)=>{
    const user=await userModel.findOne({email:request.user.email})
    try {
        if(!user){
            return response.status(404).send({message:"user not found"})
        }
        if(user.role!=="admin"){
            return response.status(403).send({message:"Only Admins can access"})
        }
        next()
    } catch (error) {
        return response.status(500).send({messae:error.message})
    } 

}

module.exports ={verifyToken,isAdmin}
