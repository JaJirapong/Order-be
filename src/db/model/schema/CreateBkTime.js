const Mongoose = require('mongoose')

const CreateTimeSchema = new Mongoose.Schema(
    {
        bktime: {
            type: String
        }
    }
)

const CreateTime = Mongoose.model('booking_time', CreateTimeSchema)
module.exports = CreateTime