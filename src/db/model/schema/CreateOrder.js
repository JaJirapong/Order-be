const Mongoose = require('mongoose')

const OrderSchema = new Mongoose.Schema(
    {
        total: {
            type: String
        },
        status:{
            type: Boolean
        },
        tbname:{
            type: String
        },
        menuId :{
            type: String
        },
        bookingId :{
            type: String
        },
        isDeliver :{
            type: Boolean
        }

    }
)

const Order = Mongoose.model('Order', OrderSchema)
module.exports = Order