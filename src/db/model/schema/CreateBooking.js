const Mongoose = require('mongoose')
const Moment = require("moment-timezone")
const dateThailand = Moment.tz(Date.now(), "Asia/Bangkok");

const BookingSchema = new Mongoose.Schema(
    {   bktable: {
            type:String
        },
        bkstatus: {
            type: Boolean
        },
        bkname:{
            type: String
        },
        bknumber:{
            type: String,
            require: true
        },
        bktime:{
            type: String
        },
        bklate:{
            type: Boolean
        },
        bkcustomer:{
            type: String
        },
        walkin:{
            type: Date
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
        customerType: {
            type: String
        }
    }
)

const booking = Mongoose.model('booking', BookingSchema)
module.exports = booking