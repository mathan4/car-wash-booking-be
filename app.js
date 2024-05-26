require("dotenv").config()
const express = require("express")
const app = express()
const mongoose= require("mongoose")
const cors= require("cors")
const PORT = process.env.PORT
const userRoute= require('./routes/userRoute')
const {verifyToken,isAdmin}=require('./middleware/verifyUserAdmin')

app.get("/api/v1",(request,response)=>{
    response.status(200).send({message:"Server Running"})
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/user",userRoute)

mongoose.connect(process.env.DB_URL)
const db= mongoose.connection
db.on('error',(errorMessage)=>console.log(errorMessage))
db.once('open',()=>console.log("DB connected successfully"))

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})