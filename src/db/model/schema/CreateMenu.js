const Mongoose = require('mongoose')

const MenuSchema = new Mongoose.Schema(
    {
        title: {
            type: String
        },
        price: {
            type: Number
        },
        category_id:{
            type: String
        },
        category:{
            type: String
        },
        status:{
            type: Boolean
        },
        image: { 
            type: String
         },
        inform:{
            type: String
        }

    }
)

const menu = Mongoose.model('menu', MenuSchema)
module.exports = menu