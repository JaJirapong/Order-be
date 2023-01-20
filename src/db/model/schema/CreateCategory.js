const Mongoose = require('mongoose')

const CategorySchema = new Mongoose.Schema(
    {
        category_name: {
            type: String,
            require: true,
            unique: true
        },
        category_id: {
            type: String,
            require: true,
            unique: true
        },
        status:{
            type: Boolean
        }
    }
)

const Category = Mongoose.model('category', CategorySchema)
module.exports = Category