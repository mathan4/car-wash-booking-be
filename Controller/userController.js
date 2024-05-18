const userModel= require("../models/userModel")
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")
const { response } = require("../routes/userRoute")
const JWT_TOKEN = "shasunfgASDFqweyfhiugrvFASDGivjhbaiyehfuqjgkjkbwihiuAASG"

const signup=async(request,response)=>{
    const userData=request.body
    try {
        const existingUser= await userModel.findOne({email:userData.email})
        if(existingUser){
            return response.status(401).send({message:"user already exists"})     
        }
        const hashedpassword= await bcrypt.hash(userData.password,10)
        const newUser= new userModel({
            email:userData.email,
            name:userData.name,
            password:hashedpassword
        })
        const addedUser=await newUser.save()
        return response.status(201).send(addedUser)
        
    } catch (error) {
        response.status(500).send({message: error.message})
        console.log(userData)
    }
    
}
const login=async(request,response)=>{
    const userData=request.body
    try {
        const validUser=await userModel.findOne({email:userData.email})
        if(!validUser){
           return response.status(404).send({message:"Invalid email"})
        }
        if(await bcrypt.compare(userData.password,validUser.password)){
            const AUTH_TOKEN= jwt.sign({email:validUser.email},JWT_TOKEN)
            return response.status(200).send({token:AUTH_TOKEN})
        }
    } catch (error) {
        return response.status(500).send({message:error.message})
    }
    response.send({message:"successfull login"})
}

module.exports= {signup,login}