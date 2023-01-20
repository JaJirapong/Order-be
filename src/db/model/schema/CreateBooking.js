const Mongoose = require('mongoose')

const BookingSchema = new Mongoose.Schema(
    {
        bkstatus: {
            type: String
        },
        bkname:{
            type: String
        },
        bknumber:{
            type: String
        },
        bktime:{
            type: Date
        },
        bklate:{
            type: String
        },
        bkarrive:{
            type: Number
        },
        checkin:{
            type: Date
        },
        checkout:{
            type: Date
        },
        starttime:{
            type: Date
        },
    }
)

const booking = Mongoose.model('booking', BookingSchema)
module.exports = booking