const Mongoose = require('mongoose')

const BooksSchema = new Mongoose.Schema(
    {
        name: {
            type: String
        }
    }
)


const Books = Mongoose.model('Books', BooksSchema)
module.exports = Books