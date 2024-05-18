const mongoose= require("mongoose")

const userSchema = mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:[user,admit],
        default:user
    }},

    {
        collection: 'users'
    }
)

module.exports = mongoose.model('users',userSchema)