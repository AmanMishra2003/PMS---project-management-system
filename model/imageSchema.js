const {Schema} = require('mongoose')

const ImageSchema = Schema({
    filename : String,
    path : String
})

module.exports = ImageSchema