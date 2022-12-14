const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : Number
    },
    password : {
        type : String
    }
},{timestamps:true})

const User = mongoose.model('enuke_user',userSchema)
module.exports = User

