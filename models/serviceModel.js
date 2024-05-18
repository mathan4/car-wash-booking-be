const mongoose= require("mongoose")

const serviceSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    service:[{
        serviceName :{
          type:String,
          required:true
        },
        serviceDescription:{
            type:String,
            required:true
        },
        servicePrice:{
            type:Number,
            required:true
        }
     }]

},{
    collection:'service'    
})

module.exports= mongoose.model('service',serviceSchema)