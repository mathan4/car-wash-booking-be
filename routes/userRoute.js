const express=require("express")
const {signup, login, getServices} =require("../Controller/userController")
const { verifyToken, isAdmin } = require("../middleware/verifyUserAdmin")
const addService = require("../Controller/adminController")
const route=express()

route.post('/signup',signup)
route.post('/login',login)
route.get('/home',verifyToken,getServices)
route.post('/addService',verifyToken,isAdmin,addService)

module.exports=route