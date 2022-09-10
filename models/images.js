const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema ({
    imageData: {
        type: String,
        required: true
    }
},{timestamps:true})

const Image = mongoose.model('image',imageSchema)
module.exports = Image

