const Mongoose = require('mongoose')
const TestSchema = new Mongoose.Schema(
    {
        name: {
            type: String
        },
        lastname: {
            type: String
        }
    }
)

const Test = Mongoose.model('Test', TestSchema)
module.exports = Test