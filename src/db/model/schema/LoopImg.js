const Mongoose = require('mongoose')

const ImageSchema = new Mongoose.Schema(
    {
        pathImage: { 
            type: String
         },
        imgName: { 
            type: String
         },
    }
)

const LoopImg = Mongoose.model('LoopImg', ImageSchema)
module.exports = LoopImg