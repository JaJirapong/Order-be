const Mongoose = require('mongoose')

const OrderSchema = new Mongoose.Schema(
    {
        total: {
            type: String
        },
        status:{
            type: String
        },
        tbname:{
            type: String
        },
        title :{
            type: String
        }
    }
)

const Order = Mongoose.model('Order', OrderSchema)
module.exports = Order