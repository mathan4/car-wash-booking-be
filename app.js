require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT

app.get("/api/v1",(request,response)=>{
    response.status(200).send({message:"Server Running"})
})

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})