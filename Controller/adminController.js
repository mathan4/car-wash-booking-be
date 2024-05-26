const serviceModel = require("../models/serviceModel")

const addService=async(request,response)=>{
    const serviceData=request.body
    console.log(request.body)
    try {
        const availableLocation= await serviceModel.findOne({location:serviceData.location})
        
        if(availableLocation){
            const existingservice= await serviceModel.findOne({
                location: serviceData.location,
                serviceName: serviceData.serviceName
            });
            if(existingservice){
                return response.status(409).send({message:"Service already exists"})
            }
            else{
                const service=await serviceModel.insertMany(serviceData)
            return response.status(200).send({"Successfully added New service":serviceData.serviceName})
            }

        }else{
            await serviceModel.insertMany(serviceData)
            return response.status(200).send("Successfully added New Service")
        }
       
    } catch (error) {
        return response.status(500).send({message:error.message})
    }
}


module.exports=addService